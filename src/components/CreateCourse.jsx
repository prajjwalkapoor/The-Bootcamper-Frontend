import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreateCourse({ match }) {
  const { state } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState(false);

  const bootcampId = match.params.id;
  const courseSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps/${bootcampId}/courses`,
        data,
        {
          headers: { Authorization: `Bearer ${state.authToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          return console.log("Something went wrong");
        }
        setData(res.data);
      });
  };
  const path = `/bootcamps/${bootcampId}`;
  if (data) return <Redirect to={path} />;
  return (
    <div className="flex mt-4">
      <div className="w-auto m-auto bg-white rounded-lg border border-gray-300 shadow-default py-5 px-16">
        <h1 className="p-2 text-2xl md:text-3xl font-bold mb-4 text-gray-900">
          Create a course for the bootcamp
        </h1>

        <form onSubmit={handleSubmit(courseSubmit)}>
          <div>
            <label htmlFor="title">Course title</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="title"
              placeholder="Enter Course Title"
              required
              {...register("title")}
            />
          </div>
          <div>
            <label htmlFor="description">Course description</label>
            <textarea
              type="text"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="description"
              placeholder="Enter course description"
              required
              {...register("description")}
            />
          </div>
          <div>
            <label htmlFor="tuition">Course cost</label>
            <input
              type="number"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="tuition"
              min="0"
              placeholder="Enter course cost"
              required
              {...register("tuition")}
            />
          </div>
          <div>
            <label htmlFor="weeks">Course duration (weeks)</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border outline-none text-base transition duration-150 ease-in-out mb-4`}
              id="weeks"
              placeholder="Enter course duration in weeks"
              required
              {...register("weeks")}
            />
          </div>
          <div>
            <label htmlFor="minimumSkill">Minimum Skill Required</label>
            <select
              id="minimumSkill"
              name="minimumSkill"
              className="border block mt-4 mb-4 text-lg p-2 w-80 hover:bg-gray-800 hover:text-white "
              required
              {...register("minimumSkill")}
            >
              <option value="">Minimum Skill Required</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label htmlFor="scholarshipAvailable" className="font-medium">
              Scholarship Available?
            </label>
            <select
              id="scholarshipAvailable"
              name="scholarshipAvailable"
              className="border block mt-4 mb-4 text-lg p-2 w-80 hover:bg-gray-800 hover:text-white "
              required
              {...register("scholarshipAvailable")}
            >
              <option value="no">Scholarship available</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button className="primary-s-btn md:primary-btn md:-ml-0.5 mt-4">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
