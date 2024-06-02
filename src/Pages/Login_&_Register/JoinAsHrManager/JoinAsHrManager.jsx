import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";
import LoginModal from "@/Pages/Shared/LoginModal/LoginModal";
import { useForm } from "react-hook-form";
import useAuth from "@/Hooks/useAuth";
import React, { useState } from "react";
import useAxionPublic from "../../../Hooks/useAxiosPublic";

const JoinAsHrManager = () => {
  const [showForm, setShowForm] = React.useState(false);
  const axionPublic = useAxionPublic();
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((res) => {
      const loggedUser = res.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL).then(() => {
        // create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axionPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Your successfully logged in",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      });
    });
  };
  return (
    <div className="w-2/4 mx-auto">
      <div className="card  w-full md:w-3/4 shadow-2xl bg-base-100 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-500 mt-1">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              {...register("photoURL", { required: true })}
              name="photoURL"
              type="text"
              placeholder="Enter your photo url"
              className="input input-bordered"
            />
            {errors.photoURL && (
              <span className="text-red-500 mt-1">Photo URL is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-500 mt-1">Email is required</span>
            )}
          </div>
          <div className="flex items-center justify-end">
            <div className="form-control w-full relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                // required
              />

              <label className="label">
                {errors.password?.type === "required" && (
                  <p className="text-red-500 mt-1">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 mt-1">
                    Password must be 6 characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500 mt-1">
                    Password must less then 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500 mt-1">
                    Password must bave one uppercase one lowercase, one number
                    and special character
                  </p>
                )}
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <p
              onClick={() => setShowPassword(!showPassword)}
              className="absolute  hover:cursor-pointer mr-3"
            >
              {showPassword ? (
                <FaRegEye></FaRegEye>
              ) : (
                <FaRegEyeSlash></FaRegEyeSlash>
              )}
            </p>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <p className="flex gap-2 px-8">
          Alredy have an account{" "}
          <LoginModal isOpen={showForm} closeModal={() => setShowForm(false)} />
          <button onClick={() => setShowForm(true)}>Login</button>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default JoinAsHrManager;
