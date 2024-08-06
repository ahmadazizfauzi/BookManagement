import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LayoutForm from "./LayoutForm";

const LayoutAddBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // handle column input user
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handlePublisherChange = (e) => setPublisher(e.target.value);
  const handlePagesChange = (e) => setPages(e.target.value);
  const handleDateChange = (date) => setDate(date);
  const handleCategoryChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedCategories(selectedValues);
  };

  // add book
  const addBookHandler = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      author,
      publisher,
      pages,
      publication_date: date.toISOString().split("T")[0],
      categories: selectedCategories, 
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/books",
        newBook
      );
      console.log("Berhasil tambah buku!");
      setTitle("");
      setDescription("");
      setAuthor("");
      setPublisher("");
      setPages("");
      setDate(new Date());
      setSelectedCategories([]);
      navigate("/");
    } catch (error) {
      console.error("failed add buku:", error);
    }
  };

  return (
    <section className="md:w-[60%] md:mx-auto font-poppins text-white pt-20 pb-20">
      <h1 className="font-bold text-2xl mb-10">Add Book</h1>
      <LayoutForm
        onSubmit={addBookHandler}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        onAuthorChange={handleAuthorChange}
        onPublisherChange={handlePublisherChange}
        onPagesChange={handlePagesChange}
        onDateChange={handleDateChange}
        titleValue={title}
        descriptionValue={description}
        authorValue={author}
        publisherValue={publisher}
        pagesValue={pages}
        dateValue={date}
        titleMaxLength={30}
        descriptionMaxLength={300}
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
    </section>
  );
};

export default LayoutAddBook;
