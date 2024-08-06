import React from "react";

const LayoutAddBookAndCategory = () => {
  return (
    <>
      <section className="  ">
        <a href="/addbook" className="md:mx-auto">
          <div className="flex justify-center">
            <button className="w-full border-none md:w-[40%] md:mx-auto bg-green-800  py-4 font-poppins text-white  rounded-xl mb-5 mt-20 hover:bg-white hover:text-black transition-all duration-300">
              <h1 className="font-bold">+ Add Book</h1>
            </button>
          </div>
        </a>
        <a href="/categories" className="md:mx-auto  ">
          <div className="flex justify-center">
            <button className="w-full border-none md:w-[40%] md:mx-auto bg-blue-700  py-4 font-poppins text-white  rounded-xl  hover:bg-white hover:text-black transition-all duration-300">
              <h1 className="font-bold">Manage Categories</h1>
            </button>
          </div>
        </a>
      </section>
    </>
  );
};

export default LayoutAddBookAndCategory;
