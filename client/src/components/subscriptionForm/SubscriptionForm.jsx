import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import stripeServices from "../../services/stripeServices";

export const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {store, dispatch} = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const priceId = store.stripePriceId; // get priceId from global state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { email },
    });

    if (paymentMethodError) {
      setMessage(paymentMethodError.message);
      setLoading(false);
      return;
    }

    try {
      const subscriptionResponse = await stripeServices.createSubscription(
        email,
        paymentMethod.id,
        priceId
      );

      if (!subscriptionResponse.success) {
        setMessage(subscriptionResponse.error || "Error creando suscripción");
        setLoading(false);
        return;
      }

      const { clientSecret } = subscriptionResponse.data;

      if (clientSecret) {
        // need to confirm payment (3D Secure or aditional actions)
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
          setMessage(confirmError.message);
          setLoading(false);
          return;
        }
      }
      // if null confirmError, then the payment was successful

      setMessage("¡Suscripción creada con éxito!");
    } catch (error) {
      setMessage("Error inesperado: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="form-control mb-3"
      />
      <CardElement />
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-3">
        {loading ? "Procesando…" : "Suscribirse"}
      </button>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </form>
  );
};
