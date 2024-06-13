import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSubcriptionCard = () => {
  const axiosPublic = useAxiosPublic();
  const { data: SubscriptionsCards = [], refetch } = useQuery({
    queryKey: ["subscribe_card"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/subscribe_card`);
      return res.data;
    },
  });
  return [SubscriptionsCards, refetch];
};

export default useSubcriptionCard;
