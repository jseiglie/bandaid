const stripeClass = require("../class/stripe.class");
const responseObject = require("../utils/response.js");
const paymentController = {};
const bodyParser = require("body-parser");
paymentController.createPaymentIntent = async (req, res) => {
  try {
    const items = req.body.items; // Expecting items to be passed in the request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .send(responseObject(400, false, "Items are required"));
    }
    const paymentIntent = await stripeClass.createPaymentIntent(items);
    res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Payment intent created successfully",
          paymentIntent
        )
      );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

paymentController.createCheckoutSession = async (req, res) => {
  try {
    const items = req.body.items; // Expecting items to be passed in the request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .send(responseObject(400, false, "Items are required"));
    }
    const session = await stripeClass.createCheckoutSession(items);
    res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Checkout session created successfully",
          session
        )
      );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

paymentController.sessionStatus = async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripeClass.getSessionStatus(sessionId);
    res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Session status fetched successfully",
          session
        )
      );
  } catch (error) {
    console.error("Error fetching session status:", error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

paymentController.createSubscription = async (req, res) => {
  try {
    const { email, paymentMethodId, priceId } = req.body;
    const user_id = req.user.id;
    if (!email || !paymentMethodId || !priceId) {
      return res
        .status(400)
        .send(
          responseObject(
            400,
            false,
            "Missing required fields: email, paymentMethodId, or priceId"
          )
        );
    }

    const subscriptionData = await stripeClass.createSubscription({
      email,
      paymentMethodId,
      priceId,
    }, user_id);

    res
      .status(200)
      .send(
        responseObject(
          200,
          true,
          "Subscription created successfully",
          subscriptionData
        )
      );
  } catch (error) {
    console.error("Error creating subscription:", error);
    res
      .status(500)
      .send(responseObject(500, false, "Internal server error", null));
  }
};

paymentController.stripeWebhookHandler = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const webhookEvent = await stripeClass.stripeWebhookHandler(sig, req.body);
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error processing webhook event:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = paymentController;
