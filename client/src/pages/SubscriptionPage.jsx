import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SubscriptionForm } from "../components/subscriptionForm/SubscriptionForm";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

export const SubscriptionPage = () => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);
