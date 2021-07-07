import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const loginSubmit = (data, e) => {
    // console.log(data);
    axios
      .post(`${process.env.REACT_APP_HOSTED_URL}/api/v1/auth/login`, data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOGIN",
          payload: res.data.token,
        });
      })
      .catch((err) => setError("Invalid Credentials Entered"));
    reset();
  };
  // console.log(error);
  if (state.authToken) return <Redirect to="/bootcamps" />;
  return (
    <div className="flex mt-4">
      <div className="w-auto m-auto bg-white border shadow-default py-10 px-16">
        <h1 className="p-2 text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          Log in to your account
        </h1>

        <form onSubmit={handleSubmit(loginSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              className={`w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              name="email"
              placeholder="Your Email"
              {...register("email")}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              className={`w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              name="password"
              placeholder="Your Password"
              minLength="6"
              {...register("password")}
            />
          </div>

          <div className="flex justify-around mt-6">
            <button
              className="primary-s-btn md:primary-btn md:-ml-6"
              // onClick={(e) => {
              //   e.preventDefault();
              //   dispatch({
              //     type: "LOGIN",
              //     payload: "oihjvsuoijbvsjikloeasgf63232",
              //   });
              // }}
            >
              Login
            </button>
            <p className="font-semibold">Forgot your password</p>
          </div>
          {error && (
            <div className="text-center mt-4 p-2">
              <p className="text-xl text-red-500 font-bold"> {error}</p>
            </div>
          )}
        </form>
        <div className="text-center mt-6 flex flex-col">
          <span className="text-xl text-gray-500">Or</span>
          <Link to="signup" className="secondary-s-btn md:secondary-btn mt-4">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
