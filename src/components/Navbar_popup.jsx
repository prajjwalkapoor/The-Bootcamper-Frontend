import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Navbar_popup({ setIsPopOpen }) {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <div className=" w-40 h-40 p-3 bg-white border border-gray-600 flex flex-col justify-around">
      <Link to="/profile" className="as-1" onClick={() => setIsPopOpen(false)}>
        My profile
      </Link>
      <Link
        to="/bootcamps"
        className="as-1"
        onClick={() => setIsPopOpen(false)}
      >
        See All Bootcamps
      </Link>
      <Link to="/contact" className="as-1" onClick={() => setIsPopOpen(false)}>
        Contact Support
      </Link>
      <Link
        to="/login"
        onClick={() => {
          dispatch({ type: "LOGOUT" });
          setIsPopOpen(false);
        }}
        className=" border border-black p-2 w-20 text-center transition duration-500 ease-in-out transform hover:scale-105"
      >
        Logout
      </Link>
    </div>
  );
}
