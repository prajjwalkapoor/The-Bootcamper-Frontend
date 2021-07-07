import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function BootcampCard({ bootcamp }) {
  const { state } = useContext(AuthContext);
  const deleteBootcamp = () => {
    if (window.confirm("Are you sure you want to delete this bootcamp?")) {
      axios.delete(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps/${bootcamp._id}`,
        {
          headers: { Authorization: `Bearer ${state.authToken}` },
        }
      );
      console.log("Thing was deleted to the database.");
      window.location.reload(true);
    } else {
      console.log("Thing was not deleted to the database.");
    }
  };

  return (
    <div className="w-auto border bg-white flex flex-col sm:flex-row items-center relative mb-4">
      <div>
        <img
          src={bootcamp.image}
          alt={bootcamp.name}
          width="360px"
          height="220px"
        />
      </div>
      <div className="p-4">
        <h1 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
          {bootcamp.name}
        </h1>
        <span className="p-2 bg-gray-800 text-white uppercase px-4 absolute right-0 top-0 text-xs md:">
          {bootcamp.city}
        </span>
        <span className="border w-max border-gray-800 text-sm hidden md:block md:p-1">
          {bootcamp.careers}
        </span>
        <div className="mt-3">
          <span className="font-semibold">Publisher:</span>
          <span>{bootcamp.user.name}</span>
        </div>
        <div className="mt-2">
          {" "}
          <Link
            to={`/bootcamps/${bootcamp._id}`}
            className="a-s1"
            id={bootcamp._id}
          >
            View Details
          </Link>
          {state.user._id === bootcamp.user._id && (
            <Link
              to={`/bootcamps/${bootcamp._id}/edit`}
              className="a-s1 ml-3"
              id={bootcamp._id}
            >
              Edit Bootcamp
            </Link>
          )}
          {state.user._id === bootcamp.user._id && (
            <Link
              // to={`/bootcamps/${bootcamp._id}/edit`}
              className="absolute bottom-1 right-1 bg-red-600 text-white p-1"
              id={bootcamp._id}
              onClick={deleteBootcamp}
            >
              Delete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
