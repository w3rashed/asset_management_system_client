import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

const Register = () => {
  return (
    <div className="w-2/4 mx-auto">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <SocialLogin></SocialLogin>
      <p>
        Alredy have an account <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
