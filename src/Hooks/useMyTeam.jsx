import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUsers from "./useUsers";

const useMyTeam = () => {
  const [userData] = useUsers();

  const axiosPublic = useAxiosPublic();
  const { data: myTeam = [], refetch } = useQuery({
    queryKey: ["my team", userData?.hr_email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my_team/${userData?.hr_email}`);
      return res.data;
    },
  });
  return [myTeam, refetch];
};

export default useMyTeam;
