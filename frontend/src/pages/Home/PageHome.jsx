import React from "react";
import LayoutInput from "../../layouts/LayoutAddBook";
import LayoutList from "../../layouts/LayoutList";
import LayoutAddBookAndCategory from "../../layouts/LayoutForAddBook";
import LayoutFooter from "../../layouts/LayoutFooter";

const PageHome = () => {
  return (
    <>
      <section className="bg-black font-poppins px-10">
        <LayoutAddBookAndCategory />
        <LayoutList />
      </section>
      <LayoutFooter />
    </>
  );
};

export default PageHome;
