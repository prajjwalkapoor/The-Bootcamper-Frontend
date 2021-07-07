import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import BootcampCard from "./BootcampCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export default function UserProfile() {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersBootcamp();
    setLoading(false);
  }, []);

  const getUsersBootcamp = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps/user/${state.user._id}`,
        {
          headers: { Authorization: `Bearer ${state.authToken}` },
        }
      )
      .then((res) => {
        if (!res.data.success) {
          return console.log("Something went wrong");
        }
        setData(res.data.data);
      });
  };
  console.log(state.user);
  if (!state.authToken) return <h1>Signin first!</h1>;
  return (
    <>
      {!loading ? (
        <div className="m-10 pb-12 border bg-white relative">
          <img
            src="https://career-lunch-storage.s3.eu-central-1.amazonaws.com/v2/blog/articles/linkedin-title-picture.jpg"
            alt=""
            className="w-full h-40 border bg-cover"
          />
          <div className="flex flex-col items-center">
            <img
              className="w-20 h-20 mt-8 ml-4 rounded-full border-2 border-gray-800"
              src="https://ritecaremedicalofficepc.com/wp-content/uploads/2019/09/img_avatar.png"
              alt="Profile image"
            />
            <h1 className="p-2 text-xl md:text-2xl font-bold mb-2 text-gray-900">
              {state.user && state.user.name}
            </h1>
            <span className="p-2 bg-gray-800 text-white right-0 top-0 text-xs absolute">
              {state.user && state.user.role}
            </span>
            <div className="mt-2">
              <span className="font-semibold">Email:</span>
              <span> {state.user && state.user.email} </span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Member since:</span>
              <span> {state.user && state.user.createdAt.slice(0, 15)} </span>
            </div>
            <div className="mt-6">
              <Link
                to="/create-bootcamp"
                className="primary-s-btn md:primary-btn"
              >
                Create bootcamp
              </Link>
              <Link to="/login" className=" secondary-s-btn md:secondary-btn">
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-10">
            <div className="col-span-1 border m-10">
              <div className="p-5 py-10">
                <p className="a-s1 mt-4">Settings</p>
                <p className="a-s1 mt-4">More</p>
                <p className="a-s1 mt-4">Announcements</p>
              </div>
            </div>
            <div id="user-bootcamps" className="col-span-3 border m-10">
              {data ? (
                data.map((bootcamp) => {
                  return (
                    <BootcampCard bootcamp={bootcamp} key={bootcamp._id} />
                  );
                })
              ) : (
                <div>
                  <h3>
                    Oops! Don't have any bootcamps to show for your profile
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <FontAwesomeIcon
            icon={faSpinner}
            size="2x"
            className="animate-spin"
          />
        </div>
      )}
    </>
  );
}
