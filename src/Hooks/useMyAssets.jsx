import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myAssets = [], refetch } = useQuery({
    queryKey: ["my assets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/request_assets/myAssets/${user?.email}`
      );
      return res.data;
    },
  });
  return [myAssets, refetch];
};

export default useMyAssets;
