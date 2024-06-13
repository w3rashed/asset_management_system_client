import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const { user, payment } = useAuth();
  const navigate = useNavigate();

  const price = payment?.price;
  console.log(payment, "paymentssssssssssssssss");

  useEffect(() => {
    if (price > 0) {
      axiosPublic
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
          setError("Failed to fetch client secret");
        });
    }
  }, [axiosPublic, payment?.price, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("Payment error:", error);
        setError(error.message);
        return;
      }

      console.log("Payment method:", paymentMethod);
      setError("");

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.error("Confirm error:", confirmError);
        setError("Payment confirmation failed");
        return;
      }

      console.log("Payment intent:", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        navigate("/");

        const paymentData = {
          email: user.email,
          price,
          transactionId: paymentIntent.id, // Corrected typo
          date: new Date().toISOString(), // Changed date format
        };

        axiosPublic
          .post("/payments", paymentData)
          .then((res) => {
            console.log("Payment saved:", res.data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for the payment!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error saving payment:", error);
            setError("Failed to save payment");
          });

        // add subschiptions info
        const subsInfo = {
          email: user.email,
          member: payment.members,
        };
        axiosPublic.patch("/subscriptions", subsInfo).then((res) => {
          console.log(res.data, "subscriptions");
        });
      }
    } catch (error) {
      console.error("Unhandled error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-[70%] mx-auto">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="px-8 py-2.5 w-full mt-5 leading-5 border rounded-md bg-[#570df8] text-white hover:text-[#570df8] hover:bg-transparent hover:border-[#570df8] duration-500"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
