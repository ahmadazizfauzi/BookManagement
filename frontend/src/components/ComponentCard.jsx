import React, { Fragment } from "react";
import { format } from "date-fns";
import {
  iconDate,
  iconPages,
  iconPerson,
  iconPublisher,
} from "../data/DataIcon";
import ComponentLine from "./ComponentLine";

const ComponentCard = (props) => {
  const {
    title,
    desc,
    publishDate,
    onDelete,
    onUpdate,
    categories,
    author,
    publisher,
    pages,
    bookCategories,
  } = props;

  // const getCategoryNames = (categoryIds) => {
  //   return categoryIds
  //     .map((id) => {
  //       const category = categories.find((cat) => cat.id === id);
  //       return category ? category.name : "";
  //     })
  //     .join(", ");
  // };

  // Format date
  const formattedPublishDate = format(new Date(publishDate), "dd MMMM yyyy");

  return (
    <Fragment>
      <section
        id="COMPONENT-CARD"
        className="border-2 border-solid pt-5 rounded-lg my-5 w-full md:w-[45%]  h-full"
      >
        <section className="px-3 font-poppins text-white">
          {/* Title */}
          <section className="mb-6">
            <h1 className="text-xl font-bold line-clamp-1 text-center">
              {title}
            </h1>
          </section>

          {/* line */}
          <ComponentLine style={"w-[80%] mx-auto bg-gray-300 h-0.5 mb-3"} />

          {/* Publish date and page */}
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 my-1">
                <img src={iconDate} alt="Icon Person" />
              </div>
              <h1 className="text-gray-500">{formattedPublishDate}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 my-1">
                <img src={iconPages} alt="Icon Person" />
              </div>
              <h1 className="text-gray-500">{pages} pages</h1>
            </div>
          </div>

          {/* Author and publisher */}
          <section className="md:flex md:justify-around mb-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 my-1">
                <img src={iconPerson} alt="Icon Person" />
              </div>
              <h1 className="text-white">{author}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 my-1">
                <img src={iconPublisher} alt="Icon Publisher" />
              </div>
              <h1 className="text-white">{publisher}</h1>
            </div>
          </section>

          {/* Description */}
          <div className="mb-10">
            <h1 className="font-bold text-xl">Description:</h1>
            <p className="text-justify">{desc}</p>
          </div>
        </section>

        {/* Category */}
        <section className="mb-10 flex flex-wrap">
          {bookCategories && bookCategories.length > 0 ? (
            bookCategories.map((categoryId) => {
              const category = categories.find((cat) => cat.id === categoryId);
              return (
                category && (
                  <button
                    key={category.id}
                    className="px-4 py-2 bg-gray-700 rounded-xl mx-2"
                  >
                    {category.name}
                  </button>
                )
              );
            })
          ) : (
            <p className="text-gray-500 text-center">No categories</p>
          )}
        </section>

        {/* Buttons */}
        <section className="mb-5 text-center">
          <button
            onClick={onUpdate}
            className="bg-blue-600 py-2 px-4 rounded-lg text-white font-bold mx-2"
          >
            Update
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 py-2 px-4 rounded-lg text-white font-bold mx-2"
          >
            Delete
          </button>
        </section>
      </section>
    </Fragment>
  );
};

export default ComponentCard;
