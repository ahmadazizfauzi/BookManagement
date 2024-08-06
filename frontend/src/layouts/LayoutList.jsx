import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ComponentCard from "../components/ComponentCard";
import ComponentSearch from "../components/ComponentSearch";

//format categories
const formatCategories = (categories) =>
  categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

const LayoutList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeBooks, setActiveBooks] = useState([]);
  const [archivedBooks, setArchivedBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookCategories, setBookCategories] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  // fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/books");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const activeBooks = data.filter((book) => !book.isArchived);
        const archivedBooks = data.filter((book) => book.isArchived);
        setActiveBooks(activeBooks);
        setArchivedBooks(archivedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // fetch category and book
  useEffect(() => {
    const fetchBookCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/book-categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const bookCategoriesMap = {};

        data.forEach((entry) => {
          if (!bookCategoriesMap[entry.book_id]) {
            bookCategoriesMap[entry.book_id] = [];
          }
          bookCategoriesMap[entry.book_id].push(entry.category_id);
        });

        setBookCategories(bookCategoriesMap);
      } catch (error) {
        console.error("Error fetching book-categories:", error);
      }
    };

    fetchBookCategories();
  }, []);

  // delete bok
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setActiveBooks(activeBooks.filter((book) => book.id !== id));
      setArchivedBooks(archivedBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // update
  const onUpdate = (id) => {
    navigate(`/updatebook/${id}`);
  };

  // catgroy change
  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
  };

  // filtered content
  const filterBooks = (books) => {
    return books
      .filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (book) =>
          selectedCategories.length === 0 ||
          (bookCategories[book.id] &&
            selectedCategories.some((catId) =>
              bookCategories[book.id].includes(catId)
            ))
      )
      .filter((book) => {
        if (startDate && endDate) {
          const publishDate = new Date(book.publication_date);
          return publishDate >= startDate && publishDate <= endDate;
        }
        return true;
      });
  };

  return (
    <Fragment>
      <section
        id="FRAGMENT-LIST"
        className="pt-5 pb-20 mt-10 text-white md:w-[80%] md:mx-auto"
      >
        <div>
          <h1 className="font-bold text-2xl text-center w-full mb-2">
            List of Books
          </h1>
        </div>

        {/* SEARCH */}
        <section className="md:flex md:items-center md:flex-wrap md:justify-start ">
          {/* search by author, title, publisher */}
          <section className="md:w-[65%]">
            <ComponentSearch setSearchTerm={setSearchTerm} />
          </section>

          {/* search by categories */}
          <section className="w-full my-5 md:w-[30%] mx-auto">
            <Select
              id="categories"
              options={formatCategories(categories)}
              isMulti
              value={formatCategories(categories).filter((category) =>
                selectedCategories.includes(category.value)
              )}
              onChange={handleCategoryChange}
              className="basic-single text-white"
              classNamePrefix="select"
              placeholder="Search by categories..."
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "black",
                  borderColor: "gray",
                  color: "white",
                  borderWidth: 2,
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
          </section>
        </section>

        {/* search by date */}
        <section className="md:justify-start md:flex">
          <div className="flex flex-wrap justify-between md:justify-start md:gap-3 ">
            <div className="w-[45%] md:w-[40%] ">
              <DatePicker
                placeholderText="Start date"
                id="start_date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3 md:mt-0"
              />
            </div>
            <div className="w-[45%] md:w-[40%]">
              <DatePicker
                placeholderText="End date"
                id="end_date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border-2 border-solid border-gray-400 p-2 rounded-lg bg-black text-white w-full my-3 md:mt-0"
              />
            </div>
          </div>
        </section>

        {/* list books */}
        <div className="flex flex-wrap justify-between">
          {activeBooks.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada buku aktif.</p>
          ) : (
            filterBooks(activeBooks)
              .map((book) => (
                <ComponentCard
                  key={book.id}
                  publishDate={book.publication_date}
                  id={book.id}
                  title={book.title}
                  desc={book.description}
                  pages={book.pages}
                  author={book.author}
                  publisher={book.publisher}
                  categories={categories}
                  bookCategories={bookCategories[book.id] || []} // Pass bookCategories
                  onDelete={() => handleDelete(book.id)}
                  onUpdate={() => onUpdate(book.id)}
                />
              ))
              .reverse()
          )}
        </div>
      </section>
      <section
        id="FRAGMENT-LIST-ARSIP"
        className="pt-5 pb-36 text-white md:w-[80%] md:mx-auto"
      >
        <div>
          <h1 className="font-bold text-2xl text-center w-full mb-6">
            Arsip Buku
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {archivedBooks.length === 0 ? (
            <p className="text-center text-gray-500">
              InsyaAllah fitur comingsoon.
            </p>
          ) : (
            filterBooks(archivedBooks)
              .map((book) => (
                <ComponentCard
                  key={book.id}
                  publishDate={book.publication_date}
                  id={book.id}
                  title={book.title}
                  desc={book.description}
                  pages={book.pages}
                  author={book.author}
                  publisher={book.publisher}
                  categories={categories}
                  bookCategories={bookCategories[book.id] || []} // Pass bookCategories
                  onDelete={() => handleDelete(book.id)}
                  onUpdate={() => onUpdate(book.id)}
                />
              ))
              .reverse()
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default LayoutList;
