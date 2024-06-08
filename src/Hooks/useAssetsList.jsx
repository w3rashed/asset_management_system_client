import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAssetsList = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: assets_list = [], refetch } = useQuery({
    queryKey: ["assets_lists", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/assets/${user?.email}`);
      return res.data;
    },
  });
  return [assets_list, refetch];
};

export default useAssetsList;
