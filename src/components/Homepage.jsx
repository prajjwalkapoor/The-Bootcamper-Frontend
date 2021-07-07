import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Homepage() {
  document.title = "The Bootcamper";

  const [city, setCity] = useState("");
  const [career, setCareer] = useState("");
  const data = { city: city, career: career };
  return (
    <div className="flex justify-center text-center mt-8">
      <div className="mt-20">
        <h1 className="p-2 text-4xl md:text-6xl font-bold mb-4 text-gray-900">
          Search for bootcamps in your city
        </h1>
        <p className="p-2 text-xl md:text-2xl mt-4 text-gray-500">
          Learn each and every thing that require to get a job in top companies
        </p>
        <form
          action=""
          className="mt-6 flex flex-col items-center md:flex-row md:justify-center "
        >
          <select
            id="city"
            name="city"
            className="border text-2xl border-gray-800 p-2 mx-1 w-80 my-2 hover:bg-gray-800 hover:text-white"
            required
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Choose a city</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
          </select>
          <select
            id="career"
            name="career"
            className="border text-2xl border-gray-800 p-2 ml-1 w-80 hover:bg-gray-800 hover:text-white "
            required
            onChange={(e) => setCareer(e.target.value)}
          >
            <option value="">Select a career</option>
            <option value="web-dev">Web Development</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="marketing">Marketing</option>
            <option value="data-science">Data science</option>
          </select>
          <Link
            to={{ pathname: "/search-result", state: data }}
            type="submit"
            className="primary-btn text-2xl w-80 mx-2 mt-2 md:mt-0 md:w-40 "
          >
            Search
          </Link>
        </form>
      </div>
    </div>
  );
}
