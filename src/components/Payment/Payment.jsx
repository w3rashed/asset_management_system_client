import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../SectionTitle/SectionTitle";
import CheckOutForm from "../CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "@/Hooks/useAuth";
import useSubcriptionCard from "@/Hooks/useSubcriptionCard";

// payment key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  

  return (
    <div>
      <SectionTitle heading="Payment"></SectionTitle>
      <Elements stripe={stripePromise}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default Payment;
