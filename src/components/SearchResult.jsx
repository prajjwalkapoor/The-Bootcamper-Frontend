import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import BootcampCard from "./BootcampCard";
export default function SearchResult() {
  const data = useLocation().state;
  const [searchResult, setSearchResult] = useState(false);
  useEffect(() => {
    getSearch();
  }, []);
  const getSearch = () => {
    const path = `${process.env.REACT_APP_HOSTED_URL}/api/v1/bootcamps?city=${data.city}&careers=${data.career}`;
    axios.get(path).then((res) => setSearchResult(res.data.data));
  };
  if (!data.city || !data.career)
    return (
      <div className="text-center m-10">
        <h1 className="text-2xl my-5">You have not selected all the fields.</h1>
        <Link to="/" className="primary-s-btn">
          Search again
        </Link>
      </div>
    );
  return (
    <div className="p-8">
      {searchResult &&
        searchResult.map((bootcamp) => {
          return <BootcampCard bootcamp={bootcamp} key={bootcamp._id} />;
        })}
    </div>
  );
}
