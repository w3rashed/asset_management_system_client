import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMyEmployeeList = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: myEmployeeList = [], refetch } = useQuery({
    queryKey: ["employee list", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my_employee/${user.email}`);
      return res.data;
    },
  });
  return [myEmployeeList, refetch];
};

export default useMyEmployeeList;
