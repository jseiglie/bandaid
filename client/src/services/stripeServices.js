import { fetcher } from "../utils/fetcher";

const stripeServices = {};
(stripeServices.createPaymentIntent = async (items) => {
  try {
    const res = await fetcher("/stripe/payment-intent", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: {
        //add token
      },
    });
    return res;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Error creating payment intent");
  }
}),
  (stripeServices.createSubscription = async (
    email,
    paymentMethodId,
    priceId
  ) => {
    return await fetcher("/stripe/create-subscription", {
      method: "POST",
      body: JSON.stringify({ email, paymentMethodId, priceId }),
      headers: {
        //add token
      },
    });
  });

export default stripeServices;
