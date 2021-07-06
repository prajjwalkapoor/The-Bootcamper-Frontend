import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function BootcampCard({ course }) {
  const { state } = useContext(AuthContext);
  if (!course) return <h1>No courses in this bootcamp</h1>;
  return (
    <div className="w-auto border bg-white flex flex-col sm:flex-row items-center relative mb-8">
      <div className="p-4">
        <h1 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
          {course.title}
        </h1>
        <span className="p-2 bg-gray-800 text-white absolute right-0 top-0 text-xs md:">
          {course.minimumSkill}
        </span>
        <span className="border w-max border-gray-800 text-sm hidden md:block md:p-1">
          Weeks : {course.weeks}
        </span>
        <p className=" text-lg md:text-lg mt-4 text-gray-500">
          {course.description}
        </p>
        <div className="mt-3">
          <span className="font-semibold">Price ${course.tuition}</span>
        </div>
        {state.user._id === course.user._id && (
          <div className="mt-4">
            {" "}
            <Link
              to={`/bootcamps/courses/${course._id}/edit`}
              className="a-s1 "
              id={course._id}
            >
              Edit Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
