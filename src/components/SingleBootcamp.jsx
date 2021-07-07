import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "./CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export default function SingleBootcamp({ match }) {
  const { state } = useContext(AuthContext);
  const [bootcamp, setBootcamp] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBootcamp();
    getCourses();
    setLoading(false);
  }, []);
  const getCourses = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps/${match.params.id}/courses`
      )
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.log(err));
  };

  const getBootcamp = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps/${match.params.id}`
      )
      .then((res) => setBootcamp(res.data.data))
      .catch((err) => console.log(err));
  };
  if (loading)
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faSpinner} size="2x" className="animate-spin" />
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <div className="col-span-2 grid-rows-1 p-8 bg-white relative">
        <p className="p-2 text-xl md:text-xl mt-4 mb-4 text-gray-800 border border-gray-800 inline-block">
          {bootcamp.careers}
        </p>
        <h1 className="p-2 text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          {bootcamp.name}
        </h1>
        {bootcamp.user
          ? bootcamp.user._id === state.user._id && (
              <Link to={bootcamp._id + "/add-course"}>Add course</Link>
            )
          : ""}
        <span className="p-2 bg-gray-800 text-white absolute right-0 top-0 text-xs md:">
          {bootcamp.city}
        </span>

        <p className="p-2 text-xl md:text-xl mt-4 text-gray-500">
          {bootcamp.description}
        </p>
        <p className="p-2 text-xl md:text-xl mt-4 text-gray-800">
          Price : ${bootcamp.totalCost}
        </p>

        <div className="mt-8 p-2">
          <h1 className="p-2 text-xl md:text-2xl font-bold mb-8 text-gray-900">
            Bootcamp's Courses
          </h1>
          {courses.map((course) => {
            return <CourseCard course={course} />;
          })}
        </div>
      </div>
      <div className="col-span-1 p-8 bg-white relative">
        <img
          src={bootcamp.image}
          alt={bootcamp.name}
          width="360px"
          height="220px"
        />
        <div className="text-center mt-6">
          <span className="text-sm text-white bg-green-600 rounded-full p-3 mx-2 absolute top-2 right-2">
            4.5/5 ratings
          </span>
        </div>
        <div className="text-center mt-12 flex flex-col md:block ">
          <Link
            // to={`/bootcamps/${bootcamp._id}/reviews`}
            className="mb-4 secondary-s-btn md:secondary-btn"
          >
            See Reviews
          </Link>
          <Link
            // to={`/bootcamps/${bootcamp._id}/enroll`}
            className="primary-s-btn md:primary-btn px-8"
          >
            Enroll Now
          </Link>
        </div>
        <div className="p-4">
          <div className="mt-3">
            <span className="font-semibold">Publisher:</span>
            <span> {bootcamp.user ? bootcamp.user.name : ""}</span>
          </div>
          <div className="mt-3">
            <span className="font-semibold">Address:</span>
            <span> {bootcamp.address}</span>
          </div>
          <div className="mt-3">
            <span className="font-semibold">Email:</span>
            <span> {bootcamp.email} </span>
          </div>
          <div className="mt-3">
            <span className="font-semibold">Phone:</span>
            <span> {bootcamp.phone} </span>
          </div>
          <div className="mt-3">
            <span className="font-semibold">Website:</span>
            <a href={bootcamp.website} className="text-green-600 font-semibold">
              {" "}
              {bootcamp.website}{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
