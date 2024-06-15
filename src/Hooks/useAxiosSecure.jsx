import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://asset-nex-server.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log("request stopped bye interceptors", token);
      config.headers.authorization = `${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // interceptors 401 and 403
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      const status = error.response.status;
      console.log("status error in the interceptor", status);
      if (status === 401 || status === 403) {
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
