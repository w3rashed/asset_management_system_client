import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin";
import LoginModal from "@/Pages/Shared/LoginModal/LoginModal";
import { useForm } from "react-hook-form";
import useAuth from "@/Hooks/useAuth";
import React, { useState } from "react";
import useAxionPublic from "../../../Hooks/useAxiosPublic";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAsEmployee = () => {
  const [showForm, setShowForm] = React.useState(false);
  const axiosPublic = useAxionPublic();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, user } = useAuth();
  const navigate = useNavigate();
  //   console.log(user);
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const { data: item = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: false,
  });
  console.log(item);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const uImg = res.data.data.display_url;
    if (res.data.success) {
      createUser(data.email, data.password).then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        updateUserProfile(data.name, uImg).then(() => {
          //   create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            image: uImg,
            birth_date: data.date,
            role: "employee",
            affiliate: "false",
          };
          axiosPublic.patch("/users", userInfo).then((res) => {
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
            navigate("/");
            refetch();
          });
        });
      });
    }
  };
  return (
    <div className="w-2/4 mx-auto">
      <Helmet>
        <title>Asset Nex | Join as Employee</title>
      </Helmet>
      <div className="card  w-full md:w-3/4 shadow-2xl bg-base-100 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-500 mt-1">Full Name is required</span>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date Of Birth</span>
            </label>
            <input
              {...register("date", { required: true })}
              name="date"
              type="date"
              className="input input-bordered"
            />
            {errors.date && (
              <span className="text-red-500 mt-1">
                Date of Birth is required
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>

            <input
              {...register("image", { required: true })}
              name="image"
              type="file"
              className="file-input w-full max-w-xs"
            />
            {errors.photo && (
              <span className="text-red-500 mt-1">Photo is required</span>
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

export default JoinAsEmployee;
