import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAllRequest = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: AllAssetsRequest = [],refetch } = useQuery({
    queryKey: ["assets request list", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/request_assets/${user?.email}`);
      return res.data;
    },
  });
  return [AllAssetsRequest,refetch];
};

export default useAllRequest;
