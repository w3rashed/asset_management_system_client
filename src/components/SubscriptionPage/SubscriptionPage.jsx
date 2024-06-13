import useAuth from "@/Hooks/useAuth";
import useSubcriptionCard from "@/Hooks/useSubcriptionCard";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../SectionTitle/SectionTitle";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../CheckoutForm/CheckoutForm";
import { Button } from "../ui/button";
import { Helmet } from "react-helmet";

// payment key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const SubscriptionPage = () => {
  const { setPayment } = useAuth();
  const [SubscriptionsCards] = useSubcriptionCard();

  console.log("hiiiiiiiiiiiii", SubscriptionsCards);

  const handlePurchase = (item) => {
    setPayment(item);
  };

  return (
    <div className="mb-10 container mx-auto">
      <Helmet>
        <title>Asset Nex | Subscriptions</title>
      </Helmet>
      <SectionTitle heading="explore our subscriptions"></SectionTitle>

      <div className="grid md:grid-cols-3 gap-6">
        {SubscriptionsCards.map((item) => (
          <div key={item._id} className="card  bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="">
                <h2 className="text-xl font-bold">Standard</h2>
                <p>Best for primary use</p>
                <h2 className="font-bold text-6xl">${item.price}</h2>
              </div>
              <div className="divider divider-info">Features</div>
              <h4 className="flex gap-2 items-center">
                <IoMdCheckmarkCircleOutline className=""></IoMdCheckmarkCircleOutline>
                <span> Member Manage : {item.members}</span>
              </h4>
              <h4 className="flex gap-2 items-center">
                <IoMdCheckmarkCircleOutline className=""></IoMdCheckmarkCircleOutline>
                <span> Assets Manage : Full</span>
              </h4>
              <Button
                onClick={() => {
                  document.getElementById("my_modal_5").showModal();
                  handlePurchase(item);
                }}
                className="bg-green-600"
              >
                Purchase
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
          <div className="modal-box ">
            <Elements stripe={stripePromise}>
              <CheckOutForm />
            </Elements>

            <div className="modal-action flex justify-center w-full">
              <form method="dialog" className="w-full">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn w-full">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default SubscriptionPage;
