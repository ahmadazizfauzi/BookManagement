import React from "react";
import { Fragment } from "react";

const ComponentSearch = ({searchTerm, setSearchTerm}) => {
    
  return (
    <Fragment>
      <div className=" md:w-full  md:mx-auto ">
        <input
          id="search"
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  p-2 text-center bg-gray-900 border-2 border-solid border-white rounded-lg text-white "
        />
      </div>
    </Fragment>
  );
};

export default ComponentSearch;
