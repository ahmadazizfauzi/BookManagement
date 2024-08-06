import React, { useState, useEffect } from "react";
import LayoutFormUpdate from "./LayoutFormUpdate";

const LayoutUpdateBook = ({ id, navigate }) => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    publisher: "",
    pages: "",
    publication_date: new Date(),
  });

  // check data before so column not empty
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/books/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBook({
          ...data,
          publication_date: new Date(data.publication_date),
        });
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setBook((prevBook) => ({
      ...prevBook,
      publication_date: date,
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...book,
          publication_date: book.publication_date.toISOString().split("T")[0], // Format date
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const titleMaxLength = 30;
  const descriptionMaxLength = 300;

  return (
    <section className="md:w-[60%] md:mx-auto pt-20 pb-20">
      <h1 className="font-bold text-2xl mb-10">Update Book</h1>
      <LayoutFormUpdate
        onSubmit={handleSubmit}
        onTitleChange={handleChange}
        onDescriptionChange={handleChange}
        onAuthorChange={handleChange}
        onPublisherChange={handleChange}
        onPagesChange={handleChange}
        onDateChange={handleDateChange}
        titleValue={book.title}
        descriptionValue={book.description}
        authorValue={book.author}
        publisherValue={book.publisher}
        pagesValue={book.pages}
        dateValue={book.publication_date}
        titleMaxLength={titleMaxLength}
        descriptionMaxLength={descriptionMaxLength}
      />
    </section>
  );
};

export default LayoutUpdateBook;
