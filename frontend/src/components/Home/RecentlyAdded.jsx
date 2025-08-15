import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard'; 
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);
  const navigate = useNavigate(); // ✅ Hook to navigate to details page

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
        console.log(response.data.data);
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching recent books", err);
      }
    };

    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100 font-semibold mb-6">
        Recently added books
      </h4>

        {/* {!Data && <div className="flex items-center justify-center my-8">
          <Loader/></div>} */}
        {/* ✅ Changed condition from !Data to Data.length === 0 to properly show loader */}
      {Data.length === 0 && (
        <div className="flex items-center justify-center my-8">
          <Loader/>
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Data.map((item, i) => (
          <div 
          key={i} 
          className="hover:scale-105 transition-transform duration-200"
          onClick={() => navigate(`/view-book-details/${item._id}`)} // ✅ Go to details page
          >
            <BookCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;


