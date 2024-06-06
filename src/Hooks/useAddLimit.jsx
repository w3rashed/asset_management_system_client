import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAddLimit = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: AddLimit = [] } = useQuery({
    queryKey: ["subscriptions", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/subscriptions/${user?.email}`);
      return res.data;
    },
  });

  return [AddLimit, refetch];
};

export default useAddLimit;
