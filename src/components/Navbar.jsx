import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar_popup from "./Navbar_popup";
export default function Navbar() {
  const { state } = useContext(AuthContext);
  const [isPopOpen, setIsPopOpen] = useState(false);
  return (
    <div className="flex justify-between border-b-2 p-4 bg-white">
      <div className=" flex p-4 items-center">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/prajjwalcdn/image/upload/v1625123254/bootcamper%20assets/LogoMakr-66xaeh_fyczit.png"
            alt="logo"
            className="w-64"
          />
        </Link>
        <div className="ml-4 hidden md:block">
          <Link to="/" className="a-s1 mx-2">
            Home
          </Link>
          <Link to="/about" className="a-s1 mx-2">
            About
          </Link>
          <Link to="/contact" className="a-s1 mx-2">
            Contact
          </Link>
        </div>
      </div>
      <div className="md:flex justify-center items-center hidden md:mx-4">
        <Link to="/bootcamps" className="primary-s-btn sm:primary-btn">
          Browse All Bootcams
        </Link>
        {!state.authToken ? (
          <Link
            to="/login"
            className=" border border-black p-2 px-14 mx-2  transition duration-500 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>
        ) : (
          ""
        )}
        {state.authToken && (
          <div className="relative">
            <img
              className="w-9 h-9 rounded-full ml-4 border-2 border-gray-800 cursor-pointer transition-all ease-in-out"
              src="https://ritecaremedicalofficepc.com/wp-content/uploads/2019/09/img_avatar.png"
              alt="Profile"
              onClick={() => setIsPopOpen(!isPopOpen)}
            />

            {isPopOpen && (
              <div className="absolute right-4 top-8 z-10">
                <Navbar_popup setIsPopOpen={setIsPopOpen} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sm:hidden mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="100%"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
  );
}
