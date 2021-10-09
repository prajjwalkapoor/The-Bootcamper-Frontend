import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
export default function EditBootcamp({ match }) {
  const { state } = useContext(AuthContext);
  const [bootcamp, setBootcamp] = useState({});
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    getBootcamp();
  }, []);
  const getBootcamp = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps/${match.params.id}`
      )
      .then((res) => setBootcamp(res.data.data))
      .catch((err) => console.log(err));
  };
  const redirectPath = `/bootcamps/${match.params.id}`;
  const submitform = (data) => {
    axios
      .put(`http://localhost:5000/api/v1/bootcamps/${match.params.id}`, data, {
        headers: { Authorization: `Bearer ${state.authToken}` },
      })
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          return console.log("Something went wrong");
        }
        setSuccess(res.data.success);
      });
  };
  console.log(success);
  console.log(redirectPath);
  if (success) return <Redirect to={redirectPath} />;
  if (!state.authToken) return <h1>you're not signed in</h1>;
  return (
    <div className="bg-white pt-4 pl-4">
      <h1 className="p-2  text-2xl font-semibold md:text-3xl m-4 text-gray-900">
        Add New Details for :<span className="font-bold"> {bootcamp.name}</span>
      </h1>
      <form onSubmit={handleSubmit(submitform)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 m-5">
          <div className="border p-10">
            <h1 className="p-2 text-xl md:text-2xl font-medium mb-4 text-gray-900">
              Bootcamp Details
            </h1>
            <div>
              <label htmlFor="name" className="font-medium">
                Name of a bootcamp
              </label>
              <input
                type="name"
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="email"
                placeholder="Enter Bootcamp's name"
                maxLength={50}
                required
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="description"
                required
                placeholder="Enter bootcamp's description"
                {...register("description")}
              />
            </div>
            <div>
              <label htmlFor="careers" className="font-medium">
                Career
              </label>
              <select
                id="careers"
                required
                name="careers"
                className="border block mt-4 mb-4 text-lg p-2 ml-1 w-80 hover:bg-gray-800 hover:text-white "
                {...register("careers")}
              >
                <option value="">Select a career</option>
                <option value="web-dev">Web Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="email"
                placeholder="Enter contact email"
                required
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="website" className="font-medium">
                Website
              </label>
              <input
                required
                type="url"
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="website"
                placeholder="Enter website URL"
                {...register("website")}
              />
            </div>
            <div>
              <label htmlFor="phone" className="font-medium">
                Phone Number
              </label>
              <input
                required
                type="tel"
                maxLength="10"
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="phone"
                placeholder="Enter contact phone number"
                {...register("phone")}
              />
            </div>
          </div>
          <div className="p-10 border">
            <h1 className="p-2 text-xl md:text-2xl font-medium mb-4 text-gray-900">
              Location Details
            </h1>
            <div>
              <label htmlFor="address" className="font-medium">
                Address
              </label>
              <input
                required
                type="text"
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="address"
                placeholder="Enter Address of venue"
                {...register("address")}
              />
            </div>
            <div>
              <label htmlFor="city" className="font-medium">
                City
              </label>
              <input
                type="text"
                className={`w-full p-2 text-primary border mt-4 outline-none text-base transition duration-150 ease-in-out mb-4`}
                id="city"
                placeholder="Enter City"
                required
                {...register("city")}
              />
            </div>
            <div>
              <label htmlFor="housing" className="font-medium">
                Housing Available
              </label>
              <select
                required
                id="housing"
                name="housing"
                className="border block mt-4 mb-4 text-lg p-2 ml-1 w-80 hover:bg-gray-800 hover:text-white "
                {...register("housing")}
              >
                <option value="no">Select housing</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="housing" className="font-medium">
                Job Assistance
              </label>
              <select
                required
                id="jobAssistance"
                name="jobAssistance"
                className="border block mt-4 mb-4 text-lg p-2 ml-1 w-80 hover:bg-gray-800 hover:text-white "
                {...register("jobAssistance")}
              >
                <option value="no">Select job assistance</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="jobGurantee" className="font-medium">
                Job Guarantee
              </label>
              <select
                id="jobGurantee"
                name="jobGurantee"
                className="border block mt-4 mb-4 text-lg p-2 ml-1 w-80 hover:bg-gray-800 hover:text-white "
                {...register("jobGurantee")}
              >
                <option value="no">Select job assistance</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="EMI" className="font-medium">
                EMI Available
              </label>
              <select
                id="EMI"
                name="EMI"
                className="border block mt-4 mb-4 text-lg p-2 ml-1 w-80 hover:bg-gray-800 hover:text-white "
                {...register("EMI")}
              >
                <option value="no">EMI Available?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="m-5">
          <button
            type="submit"
            className="text-center border w-full border-black bg-gray-800 text-white p-2 px-8 mr-2 transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gray-800 hover:text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}


//nice 