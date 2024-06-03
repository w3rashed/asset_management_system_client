import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useAxionPublic from "../../../Hooks/useAxiosPublic";

const SubscriptionsCard = () => {
  const axiosPublic = useAxionPublic();

  const { data: items = [] } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/subscriptions`);
      return res.data;
    },
  });
  // console.log("hiiiiiiiiiiiii", item);

  const handlePurchase = (item) => {
    console.log("rrrrrrrr", item.price);
  };

  return (
    <div className="mb-10">
      <SectionTitle heading="explore our subscriptions"></SectionTitle>
      <div className="grid md:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
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
                onClick={() => handlePurchase(item)}
                className="bg-green-600"
              >
                Purchase
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsCard;
