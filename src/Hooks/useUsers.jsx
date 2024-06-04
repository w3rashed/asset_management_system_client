import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  // tanstake query
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { refetch, data: userData = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return [userData, refetch];
};

export default useUsers;
