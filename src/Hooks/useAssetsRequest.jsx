import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useUsers from "./useUsers";

const useAssetsRequest = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [userData] = useUsers();
  const { data: request_assets_list = [], refetch } = useQuery({
    queryKey: ["request_assets_list", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/assets/${userData?.hr_email}`);
      return res.data;
    },
  });
  return [request_assets_list, refetch];
};

export default useAssetsRequest;
