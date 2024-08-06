import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutUpdateBook from "../../layouts/LayoutUpdateBook";

const PageUpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <section className="bg-black font-poppins text-white px-5">
      <LayoutUpdateBook id={id} navigate={navigate} />
    </section>
  );
};

export default PageUpdateBook;
