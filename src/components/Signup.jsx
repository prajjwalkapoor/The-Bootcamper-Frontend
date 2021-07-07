import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Signup() {
  const { state, dispatch } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_HOSTED_URL}/api/v1/auth/register`, {
        name,
        email,
        role,
        password,
      })
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          return console.log("Something went wrong");
        }
        dispatch({
          type: "LOGIN",
          payload: res.data.token,
        });
      });
  };
  if (state.authToken) return <h1>You are Signed in</h1>;
  return (
    <div className="flex mt-4">
      <div className="w-auto m-auto bg-white rounded-lg border border-gray-300 shadow-default py-5 px-16">
        <h1 className="p-2 text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          Create a new account
        </h1>

        <form onSubmit={registerSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="name"
              placeholder="Your name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Are you a?</label>
            <select
              id="role"
              name="role"
              className="border text-sm p-2 ml-4 mb-4 hover:bg-gray-800 hover:text-white"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Are you a?</option>
              <option value="user">Student</option>
              <option value="publisher">Organizer</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-around mt-6">
            <button className="primary-s-btn md:primary-btn md:-ml-6">
              Create
            </button>
            <Link to="/login" className="font-normal mx-2">
              Already registered?
              <br /> <b>Sign in now</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
