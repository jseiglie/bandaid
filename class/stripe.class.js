require("dotenv").config();
const stripeLib = require("stripe");
const Subscriptions = require("../models/").Subscriptions;
const UserSubscriptions = require("../models/").UserSubscriptions;
/*
items:{
  amount: 1099, //remember, has ton be in cents
  currency: 'eur',
  automatic_payment_methods: {
    enabled: true,
  },
}
*/

class StripeClass {
  constructor() {
    this.stripe = stripeLib(process.env.STRIPE_SECRET_KEY);
  }

  async getAmount(items) {
    //item validation
    // if (!items || !Array.isArray(items) || items.length === 0) {
    //   throw new Error("Items must be a non-empty array");
    // }

    // get items from db and calculate total amount
    const amount = 10000; // Example amount in cents, replace with actual calculation logic
    return amount;
  }

  async createPaymentIntent(items) {
    try {
      const amount = await this.getAmount(items);
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return { success: true, clientSecret: paymentIntent.client_secret };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  async createCheckoutSession(items) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        ui_mode: "custom",
        mode: "payment",
        line_items: items,
        return_url: `${process.env.FRONT_APP}/complete?session_id={CHECKOUT_SESSION_ID}`,
      });

      return { clientSecret: session.client_secret };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  }

  async getSessionStatus(sessionId) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent"],
      });

      return {
        status: session.status,
        payment_status: session.payment_status,
        payment_intent_id: session.payment_intent.id,
        payment_intent_status: session.payment_intent.status,
      };
    } catch (error) {
      console.error("Error retrieving session status:", error);
      throw error;
    }
  }

  async createSubscription({ email, paymentMethodId, priceId}, user_id) {
    try {
      // 1.create a customer with the provided email and payment method
      const customer = await this.stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      // 2. create the subscription
      // priceId should be the ID of the price you created in Stripe Dashboard
      // Ensure that the priceId is valid and corresponds to a recurring price
      const subscription = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        expand: ["latest_invoice.payment_intent"],
      });

      //get subscription from db
      const localSubscription = await Subscriptions.findOne({
        where: { price_id: priceId },
      });
      if (!localSubscription) {
        throw new Error("Subscription not found in the database");
      }

      const itemPeriod = subscription.items?.data?.[0]?.period;
      let current_period_start, current_period_end;
      if (!itemPeriod?.start || !itemPeriod?.end) {
        console.error("Missing period data in Stripe subscription");
        current_period_start = new Date(); // Set to current date if no start date is provided in the subscription data
        //add one month to current date for end date
        current_period_end = new Date() + 30 * 24 * 60 * 60 * 1000; // Default to one month later if no end date is provided
      } else {
        current_period_start = new Date(itemPeriod.start * 1000);
        current_period_end = new Date(itemPeriod.end * 1000);
      }

      // 3. Save the subscription details in the database
      await UserSubscriptions.create({
        user_id: user_id, // Assuming user_id is the Stripe customer ID
        subscription_id: localSubscription.id, // This can be set later if needed
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customer.id,
        stripe_invoice_id: subscription.latest_invoice.id,
        price_amount: subscription.items.data[0].price.unit_amount / 100, // Convert cents to euros
        price_currency: subscription.items.data[0].price.currency,
        invoice_pdf: subscription.latest_invoice.invoice_pdf,
        hosted_invoice_url: subscription.latest_invoice.hosted_invoice_url,
        current_period_start: current_period_start,
        current_period_end: current_period_end,
        status: subscription.status,
      });

      return {
        success: true,
        clientSecret:
          subscription.latest_invoice?.payment_intent?.client_secret || null,
        subscription_invoice: {
          hosted_invoice_url: subscription.latest_invoice.hosted_invoice_url,
          invoice_pdf: subscription.latest_invoice.invoice_pdf,
          period_start: subscription.latest_invoice.period_start,
          period_end: subscription.latest_invoice.period_end,
          subtotal: subscription.latest_invoice.subtotal,
          total: subscription.latest_invoice.total,
          invoice_id: subscription.latest_invoice.id,
          subscription_id: subscription.id,
          customer_id: customer.id,
        },
      };
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }

  async stripeWebhookHandler(sig, rawBody) {
    let event;
    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Error verifying webhook signature:", error);
      throw new Error("Webhook signature verification failed");
    }

    // Ahora manejamos eventos según el tipo
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntentSucceeded = event.data.object;
        console.log("PaymentIntent was successful!", paymentIntentSucceeded);
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object;
        try {
          await UserSubscriptions.update(
            {
              status: "paid",
              current_period_start: new Date(invoice.period_start * 1000),
              current_period_end: new Date(invoice.period_end * 1000),
              invoice_pdf: invoice.invoice_pdf,
              hosted_invoice_url: invoice.hosted_invoice_url,
            },
            {
              where: { stripe_invoice_id: invoice.id },
            }
          );
          console.log("Subscription marked as paid");
        } catch (error) {
          console.error("DB update error on invoice.paid:", error);
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        try {
          await UserSubscriptions.update(
            {
              status: "payment_failed",
            },
            {
              where: { stripe_invoice_id: invoice.id },
            }
          );
          console.log("Subscription marked as payment_failed");
        } catch (error) {
          console.error("DB update error on invoice.payment_failed:", error);
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        try {
          await UserSubscriptions.update(
            {
              status: subscription.status,
              current_period_start: new Date(
                subscription.current_period_start * 1000
              ),
              current_period_end: new Date(
                subscription.current_period_end * 1000
              ),
            },
            {
              where: { stripe_subscription_id: subscription.id },
            }
          );
          console.log("Subscription updated");
        } catch (error) {
          console.error(
            "DB update error on customer.subscription.updated:",
            error
          );
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        try {
          await UserSubscriptions.update(
            {
              status: "canceled",
            },
            {
              where: { stripe_subscription_id: subscription.id },
            }
          );
          console.log("Subscription canceled");
        } catch (error) {
          console.error(
            "DB update error on customer.subscription.deleted:",
            error
          );
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return event; // devuelve el evento para que el controller lo use
  }
}

module.exports = new StripeClass(); // ✅ Instancia única
