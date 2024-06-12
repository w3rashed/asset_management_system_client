import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMyAssets = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: myAssets = [], refetch } = useQuery({
    queryKey: ["my assets", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/request_assets/myAssets/${user?.email}`
      );
      return res.data;
    },
  });
  return [myAssets, refetch];
};

export default useMyAssets;
