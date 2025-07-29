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
    </div>
  );
};

export default AllBooks;
