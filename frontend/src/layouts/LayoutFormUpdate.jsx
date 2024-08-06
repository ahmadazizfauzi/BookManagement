import React, { Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  iconDate,
  iconPages,
  iconPerson,
  iconPublisher,
} from "../data/DataIcon";

const LayoutFormUpdate = ({
  onSubmit,
  onTitleChange,
  onDescriptionChange,
  onAuthorChange,
  onPublisherChange,
  onPagesChange,
  onDateChange,
  titleValue,
  descriptionValue,
  authorValue,
  publisherValue,
  pagesValue,
  dateValue,
  titleMaxLength,
  descriptionMaxLength,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <TitleInput
        titleValue={titleValue}
        onTitleChange={onTitleChange}
        titleMaxLength={titleMaxLength}
      />

      {/* <desc></desc> */}
      <DescriptionInput
        descriptionValue={descriptionValue}
        onDescriptionChange={onDescriptionChange}
        descriptionMaxLength={descriptionMaxLength}
      />

      {/* author and publisher */}
      <section className="flex flex-wrap justify-between ">
        <AuthorInput
          authorValue={authorValue}
          onAuthorChange={onAuthorChange}
        />

        <PublisherInput
          publisherValue={publisherValue}
          onPublisherChange={onPublisherChange}
        />
      </section>

      {/* pages and date */}
      <section className="flex justify-between">
        <PagesInput pagesValue={pagesValue} onPagesChange={onPagesChange} />
        <PublicationDateInput
          dateValue={dateValue}
          onDateChange={onDateChange}
        />
      </section>
    </div>
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-white hover:text-black font-bold transition-all duration-300 px-10 "
      >
        Update
      </button>
    </div>
  </form>
);

export default LayoutFormUpdate;

// LIMITTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTT

const TitleInput = ({ titleValue, onTitleChange, titleMaxLength }) => (
  <div className="mb-3">
    <div className="flex justify-between items-center">
      <h1>Title</h1>
      <h1 className="text-end text-gray-300 text-sm">
        Remain character: {titleMaxLength - titleValue.length}
      </h1>
    </div>
    <input
      type="text"
      id="title"
      name="title"
      placeholder="Title"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={titleValue}
      onChange={onTitleChange}
    />
  </div>
);

const AuthorInput = ({ authorValue, onAuthorChange }) => (
  <div className="mb-3 w-full md:w-[40%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconPerson} alt="Icon Person" />
      </div>
      <label htmlFor="author">Author</label>
    </div>
    <input
      type="text"
      id="author"
      name="author"
      placeholder="Author"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={authorValue}
      onChange={onAuthorChange}
    />
  </div>
);

const PublisherInput = ({ publisherValue, onPublisherChange }) => (
  <div className="mb-3  w-full md:w-[40%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconPublisher} alt="Icon Publisher" />
      </div>
      <label htmlFor="publisher">Publisher</label>
    </div>
    <input
      type="text"
      id="publisher"
      name="publisher"
      placeholder="Publisher"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={publisherValue}
      onChange={onPublisherChange}
    />
  </div>
);

const PagesInput = ({ pagesValue, onPagesChange }) => (
  <div className="mb-3 w-[30%] md:w-[40%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconPages} alt="Icon date" />
      </div>
      <label htmlFor="pages">Pages</label>
    </div>
    <input
      type="number"
      id="pages"
      name="pages"
      placeholder="Number of Pages"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={pagesValue}
      onChange={onPagesChange}
    />
  </div>
);

const PublicationDateInput = ({ dateValue, onDateChange }) => (
  <div className="mb-3 w-[60%] md:w-[40%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconDate} alt="Icon date" />
      </div>
      <label htmlFor="publication_date">Publication Date</label>
    </div>
    <DatePicker
      id="publication_date"
      name="publication_date"
      selected={dateValue}
      onChange={onDateChange}
      dateFormat="yyyy-MM-dd"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
    />
  </div>
);

const DescriptionInput = ({
  descriptionValue,
  onDescriptionChange,
  descriptionMaxLength,
}) => (
  <div className="mb-3">
    <div className="flex justify-between items-center">
      <h1>Description</h1>
      <h1 className="text-end text-gray-300 text-sm">
        Remain character: {descriptionMaxLength - descriptionValue.length}
      </h1>
    </div>
    <textarea
      id="description"
      name="description"
      placeholder="Description"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      rows="5"
      value={descriptionValue}
      onChange={onDescriptionChange}
    />
  </div>
);
