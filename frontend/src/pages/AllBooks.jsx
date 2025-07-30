<<<<<<< HEAD
import { Link } from 'react-router-dom';

const AllBooks = () => {
  const books = [
    {
      id: 'book1',
      title: 'Atomic Habits',
      author: 'James Clear',
      url: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
    },
    {
      id: 'book2',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      url: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg',
    },
  ];

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => {
        console.log("Book link generated for:", book.id);
        return (
          <div key={book.id} className="bg-zinc-700 p-4 rounded">
            <img
              src={book.url}
              alt={book.title}
              className="h-48 w-full object-cover rounded"
            />
            <h2 className="text-xl mt-2">{book.title}</h2>
            <p className="text-zinc-400">by {book.author}</p>

            <Link
              to={`/view-book-details/${book.id}`}
              className="mt-4 inline-block text-blue-400 hover:underline"
            >
              View Details
            </Link>
          </div>
        );
      })}
=======

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard'; 

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching all books", error);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100 font-semibold mb-6">
        All Books
      </h4>

      {!Data.length ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Data.map((item, i) => (
            <div key={i} className="hover:scale-105 transition-transform duration-200">
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20
    </div>
  );
};

export default AllBooks;
