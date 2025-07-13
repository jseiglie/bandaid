import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentStatus from "../components/paymentStatus/PaymentStatus.component";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

export const CompletedPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatus />
    </Elements>
  );
};