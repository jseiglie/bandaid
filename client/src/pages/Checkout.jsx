import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import stripeServices from "../services/stripeServices";
import { CheckoutForm } from "../components/checkout/Checkout.component";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

export const Checkout = () => {
  const { store } = useGlobalReducer();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!store.cart || store.cart.length === 0) return;

    stripeServices
      .createPaymentIntent(store.cart)
      .then((res) => {
        if (res.success) {
          setClientSecret(res.data.clientSecret);
        } else {
          console.error("Failed to create payment intent");
        }
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, [store.cart]);

  const options = {
    clientSecret,
     // Fully customizable with appearance API.
    // https://docs.stripe.com/js/elements_object/create#stripe_elements-options-appearance
    // appearance: {
    //   /*...*/
    // },
  };

  return (
    <div>
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Cargando formulario de pago...</p>
      )}
    </div>
  );
};
