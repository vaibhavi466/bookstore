import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("📦 Token from localStorage:", token);

        const response = await axios.get("http://localhost:5000/api/books/get-all-books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📚 API Response:", response.data);

        setData(response.data.books);
      } catch (error) {
        console.error("❌ Error fetching all books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>All Books</h2>
      <div>
        {data.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

