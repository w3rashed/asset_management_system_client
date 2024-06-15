import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useAxionPublic from "../../../Hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "@/Hooks/useAuth";
import CheckOutForm from "@/components/CheckoutForm/CheckoutForm";
import useSubcriptionCard from "@/Hooks/useSubcriptionCard";

// payment key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const SubscriptionsCard = () => {
  const { setPayment } = useAuth();
  const [SubscriptionsCards] = useSubcriptionCard();

  console.log("hiiiiiiiiiiiii", SubscriptionsCards);

  const handlePurchase = (item) => {
    setPayment(item);
  };

  return (
    <div className="mb-10 container mx-auto">
      <div className="my-10">
        <SectionTitle heading="explore our subscriptions"></SectionTitle>
      </div>

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
            <form>
              <div className="modal-action">
                <button
                  className="px-8 py-2.5 w-full mt-5 leading-5 border rounded-md   bg-[#2ECC71] text-white hover:text-[#2ECC71] hover:bg-transparent hover:border-[#2ECC71] duration-500"
                  onClick={() => {
                    const modal = document.getElementById("my_modal_5");
                    modal.close();
                  }}
                >
                  Confirm
                </button>
              </div>
            </form>
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

export default SubscriptionsCard;
