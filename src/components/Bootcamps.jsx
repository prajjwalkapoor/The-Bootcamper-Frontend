import axios from "axios";
import React, { useEffect, useState } from "react";
import BootcampCard from "./BootcampCard";
export default function Bootcamps() {
  //Filtering bootcamps

  const [filterByCity, setFilterByCity] = useState("");
  // const [filterByCareer, setFilterByCareer] = useState("");
  // const [filterByPrice, setFilterByPrice] = useState("");

  // fetching bootcamps
  const [bootcamps, setBootcamps] = useState([]);

  const getBootcamps = () => {
    axios
      .get(
        `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps?${
          filterByCity ? "city=" + filterByCity : ""
        }`
      )
      .then((res) => setBootcamps(res.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getBootcamps();
  }, [getBootcamps]);
  return (
    <div className="md:grid grid-cols-4">
      <div className="col-span-1">
        <div className="w-full md:w-auto p-8 border-r h-full bg-white">
          <form action="/bootcamp" method="get">
            <div>
              <h3 className=" text-sm md:text-xl font-bold mb-4 text-gray-900">
                Filter by
              </h3>
              <h4 className="text-sm md:text-base font-bold mb-1 text-gray-900">
                City
              </h4>
              <select
                id="city"
                name="city"
                className="border text-lg border-gray-800 p-2 mx-1 w-60 my-2 hover:bg-gray-800 hover:text-white"
                onChange={(e) => setFilterByCity(e.target.value)}
              >
                <option value="">Choose a city</option>
                <option value="">All</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>

            {/* <h4 className="text-sm md:text-base font-bold mb-1 text-gray-900">
              Price
            </h4> */}
            {/* <select
              id="city"
              name="city"
              className="border text-lg border-gray-800 p-2 mx-1 w-60 my-2 hover:bg-gray-800 hover:text-white"
            >
              <option value="">Sort by price</option>
              <option value="ascending">Ascending</option>
              <option value="ascending">Decending</option>
            </select>
            <h4 className="text-sm md:text-base font-bold mb-1 text-gray-900">
              Career
            </h4>
            <select
              id="city"
              name="city"
              className="border text-lg border-gray-800 p-2 mx-1 w-60 my-2 hover:bg-gray-800 hover:text-white"
            >
              <option value="">Sort by career</option>
              <option value="all">All Categories</option>
              <option value="web-dev">Web Development</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="marketing">Marketing</option>
            </select> */}
          </form>
        </div>
      </div>
      <div className="col-span-3 p-6 flex flex-col">
        {bootcamps.map((bootcamp) => {
          return <BootcampCard bootcamp={bootcamp} key={bootcamp._id} />;
        })}
      </div>
    </div>
  );
}
