import React, { useState, useEffect } from "react";

const PageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch existing categories from the server when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        const response = await fetch('http://localhost:3001/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCategory }),
        });
        if (!response.ok) {
          const data = await response.json();
          console.error('Error adding category:', data.error);
          return;
        }
        const data = await response.json();
        setCategories([...categories, { id: data.id, name: data.name }]);
        setNewCategory("");
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCategories(categories.filter(category => category.id !== id));
      } else {
        console.error('Error deleting category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="font-poppins bg-black pt-20 px-5 pb-52 text-white">
        <div className="md:w-[60%] md:mx-auto">
          <h1 className="text-2xl font-bold mb-10">Categories</h1>
          <div className="mb-5 justify-between flex">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="p-2 rounded border-2 border-solid border-white bg-black text-white w-full"
              placeholder="Add new category"
            />
            <button
              onClick={handleAddCategory}
              className="ml-2 py-2 px-10 hover:opacity-50 transition-all duration-300 bg-blue-700 rounded text-white"
            >
              Add
            </button>
          </div>

        

          {/* text  categories */}
          <div className="mt-10 mb-5">
            <h1 className="text-xl font-bold text-center">List of Categories</h1>
          </div>

            {/* Search categories */}
            <div className="mb-5">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="py-4 px-4 rounded-xl border-none text-white w-full bg-gray-900"
              placeholder="Search categories 🔎"
            />
          </div>

          {/* list */}
          <ul>
            {filteredCategories.map((category) => (
              <li
                key={category.id}
                className="mb-2 flex justify-between items-center"
              >
                {category.name}
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="ml-2 p-1 bg-red-600 rounded text-white hover:opacity-50 transition-all duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default PageCategories;
