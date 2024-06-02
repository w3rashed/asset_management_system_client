import SocialLogin from "./SocialLogin";
import React from "react";
import LoginModal from "../Shared/LoginModal/LoginModal";

const Register = () => {
  const [showForm, setShowForm] = React.useState(false);
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
      <p className="flex gap-2">
        Alredy have an account{" "}
        <LoginModal isOpen={showForm} closeModal={() => setShowForm(false)} />
        <button onClick={() => setShowForm(true)}>Login</button>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
