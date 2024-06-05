import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllEmployee = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allEmployee = [], refetch } = useQuery({
    queryKey: ["elployee"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all_users");
      return res.data;
    },
  });

  return [allEmployee, refetch];
};

export default useAllEmployee;
