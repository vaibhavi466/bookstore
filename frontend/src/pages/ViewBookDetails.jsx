import React, { useEffect } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from 'react-icons/fa';

import { useSelector } from 'react-redux';

const dummyBooks = {
  book1: {
    id: "book1",
    title: "Atomic Habits",
    author: "James Clear",
    desc: "A guide to building good habits and breaking bad ones.",
    language: "English",
    price: 499,
    url: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  },
  book2: {
    id: "book2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    desc: "Timeless lessons on wealth, greed, and happiness.",
    language: "English",
    price: 399,
    url: "https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg",
  },
};

const ViewBookDetails = () => {
  
  const { id } = useParams();
  
  const Data = dummyBooks[id];
  // const[Data , setData] = useState() ;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) ;
  const role = useSelector((state) => state.auth.role) ;
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch() ;
  }, []) ;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
      const response = await axios.put(
        `http://localhost:1000/api/v1/add-book-to-favourite`,
        {},
        { headers }
      );
      alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
        `http://localhost:1000/api/v1/add-to-cart`,
        {},
        { headers }
      );
    alert(response.data.message);
  };

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-7">
            <div className="w-full md:w-1/2 flex justify-center bg-zinc-800">
              {" "}
              <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded gap-7 lg:gap-8">
                {" "}
                <img
                  src={Data.url}
                  alt={Data.title}
                  className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
                />
                {isLoggedIn === true && role === "user" && (
                    <div className="flex flex-col gap-4 mt-4 lg:mt-0">
                      {/* Add to Favourites Button */}
                      <button
                        className="bg-red-700 px-6 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:p-0 hover:bg-red-900 text-white text-lg flex items-center justify-center gap-2"
                        onClick={handleFavourite}
                      >
                        <FaHeart className="text-xl" />
                        <span className="block lg:hidden">Favourites</span>
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        className="bg-green-600 px-6 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:p-0 hover:bg-green-700 text-white text-lg flex items-center justify-center gap-2"
                        onClick={handleCart}
                      >
                        <FaShoppingCart className="text-xl" />
                        <span className="block lg:hidden">Add to Cart</span>
                      </button>
                    </div>
                )}


                {isLoggedIn === true && role === "admin" && (
                  <div className="flex flex-col gap-4 mt-4 lg:mt-0">
                    {/* Edit Button */}
                    <button className="bg-white px-6 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:p-0 hover:bg-gray-200 text-black text-lg flex items-center justify-center gap-2">
                      <FaEdit className="text-xl" />
                      <span className="block lg:hidden">Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button className="bg-white px-6 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:p-0 hover:bg-gray-200 text-red-600 text-lg flex items-center justify-center gap-2">
                      <MdOutlineDelete className="text-xl" />
                      <span className="block lg:hidden">Delete</span>
                    </button>
                  </div>
                )}


              </div>
            </div>

            <div className="text-white p-4 w-full lg:w-1/2">
              <h1 className="text-3xl text-zinc-300 font-semibold">{Data.title}</h1>
              <p className="text-zinc-400 mt-1 text-lg">by {Data.author}</p>
              <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
              <p className="flex items-center gap-2 mt-4 text-zinc-400">
                <GrLanguage /> {Data.language}
              </p>
              <p className="mt-4 text-2xl font-semibold">Price: ₹{Data.price}{" "}</p>

              
            </div>
        </div>


      )}
      {!Data && (
        <div className="text-center text-red-400 py-20">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
