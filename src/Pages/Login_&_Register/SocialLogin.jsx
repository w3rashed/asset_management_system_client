import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GrGoogle } from "react-icons/gr";
import { Button } from "@/components/ui/button";

const SocialLogin = () => {
  const { googleLogin } = useAuth();

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in with google !",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
      // const userInfo = {
      //   email: res.user?.email,
      //   name: res.user?.displayName,
      // };
      // axiosPublic.post("/users", userInfo).then((res) => {
      //   console.log(res.data);
      //   navigate("/");
      // });
    });
  };
  return (
    <div className="mb-7">
      <div className="divider">OR</div>
      <div className="flex justify-center">
        <Button onClick={handleGoogleLogin} className="flex gap-2">
          <GrGoogle></GrGoogle>
          Google
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
