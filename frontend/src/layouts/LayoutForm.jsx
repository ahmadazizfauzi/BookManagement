import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  iconDate,
  iconPages,
  iconPerson,
  iconPublisher,
} from "../data/DataIcon";

const LayoutForm = ({
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
  categories,
  selectedCategories,
  onCategoryChange,
}) => (
  <form onSubmit={onSubmit}>
    <TitleInput
      titleValue={titleValue}
      onTitleChange={onTitleChange}
      titleMaxLength={titleMaxLength}
    />
    <DescriptionInput
      descriptionValue={descriptionValue}
      onDescriptionChange={onDescriptionChange}
      descriptionMaxLength={descriptionMaxLength}
    />
    <div className="flex flex-wrap md:flex-nowrap justify-between">
      <AuthorInput authorValue={authorValue} onAuthorChange={onAuthorChange} />
      <PublisherInput
        publisherValue={publisherValue}
        onPublisherChange={onPublisherChange}
      />
    </div>
    <div className="flex flex-wrap md:flex-wrap justify-between ">
      <PagesInput pagesValue={pagesValue} onPagesChange={onPagesChange} />
      <PublicationDateInput dateValue={dateValue} onDateChange={onDateChange} />
    </div>
    <CategorySelect
      categories={categories}
      selectedCategories={selectedCategories}
      onCategoryChange={onCategoryChange}
    />
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-white hover:text-black font-bold transition-all duration-300 px-10"
      >
        Add Book
      </button>
    </div>
  </form>
);

export default LayoutForm;

// LIMITTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTTTTTT
// LIMITTTTTTTTTTTTTTTTTTTTTTTTTTTTT

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
      placeholder="Title"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={titleValue}
      onChange={onTitleChange}
    />
  </div>
);

const AuthorInput = ({ authorValue, onAuthorChange }) => (
  <div className="mb-3 md:w-[40%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconPerson} alt="Icon Person" />
      </div>
      <label htmlFor="author">Author</label>
    </div>
    <input
      type="text"
      id="author"
      placeholder="Author"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={authorValue}
      onChange={onAuthorChange}
    />
  </div>
);

const PublisherInput = ({ publisherValue, onPublisherChange }) => (
  <div className="mb-3 md:w-[40%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconPublisher} alt="Icon Publisher" />
      </div>
      <label htmlFor="publisher">Publisher</label>
    </div>
    <input
      type="text"
      id="publisher"
      placeholder="Publisher"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      value={publisherValue}
      onChange={onPublisherChange}
    />
  </div>
);

const PagesInput = ({ pagesValue, onPagesChange }) => (
  <div className="mb-3 w-[30%] md:w-[30%]">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconPages} alt="Icon date" />
      </div>
      <label htmlFor="pages">Pages</label>
    </div>
    <div>
      <input
        type="number"
        id="pages"
        placeholder="Number of Pages"
        className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
        value={pagesValue}
        onChange={onPagesChange}
      />
    </div>
  </div>
);

const PublicationDateInput = ({ dateValue, onDateChange }) => (
  <div className="mb-3 w-[50%] md:w-[30%]  ">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 my-1">
        <img src={iconDate} alt="Icon date" />
      </div>
      <label htmlFor="publication_date">Publication Date</label>
    </div>
    <div>
      <DatePicker
        id="publication_date"
        selected={dateValue}
        onChange={onDateChange}
        dateFormat="yyyy-MM-dd"
        className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full  my-3"
      />
    </div>
  </div>
);

const CategorySelect = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const formatCategories = (categories) =>
    categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

  const handleChange = (selectedOptions) => {
    onCategoryChange(selectedOptions);
  };

  return (
    <div className="mb-3">
      <label htmlFor="categories">Categories</label>
      <Select
        id="categories"
        options={formatCategories(categories)}
        isMulti
        value={formatCategories(categories).filter((category) =>
          selectedCategories.includes(category.value)
        )}
        onChange={handleChange}
        className="basic-single bg-black text-white"
        classNamePrefix="select"
        placeholder="Select categories..."
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "black",
            borderColor: "gray",
            color: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "gray" : "black",
            color: "white",
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "gray",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "black",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "black",
            ":hover": {
              backgroundColor: "gray",
              color: "white",
            },
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "white",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
        }}
      />
    </div>
  );
};

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
      placeholder="Description"
      className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3"
      rows="5"
      value={descriptionValue}
      onChange={onDescriptionChange}
    />
  </div>
);
