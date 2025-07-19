import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa"; // ✅ FIXED: Added missing FaShoppingCart and FaEdit imports
import { MdOutlineDelete } from "react-icons/md";
import { GrLanguage } from "react-icons/gr"; // ✅ FIXED: Added missing GrLanguage import
import Loader from "../components/common/Loader";
import { useNavigate } from "react-router-dom";
const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const useMockData = true; // false -> when backend is ready
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState(localStorage.getItem("role")?.trim() || "user");


  // useEffect(() => {
  //   // ✅ Dynamically fetch role and login state
  //   setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  //   setRole(localStorage.getItem("role")?.trim() || "user");
  // }, []);

  useEffect(() => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  console.log("isLoggedIn from storage:", loggedIn); // Should log "true"
  console.log("role from storage:", userRole);       // Should log "admin" or "user"

  setIsLoggedIn(loggedIn === "true");
  setRole(userRole?.trim() || "user");
  }, []);


  
  const getMockBook = (id) => ({
    _id: id,
    title: "Atomic Habits",
    author: "James Clear",
    desc: "An easy & proven way to build good habits & break bad ones.",
    price: 499,
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", // ✅ FIXED: Changed 'image' to 'url' to match your UI usage
    language: "English", // ✅ FIXED: Added missing language field
    quantity: 10,
    createdAt: new Date().toISOString()
  });
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (useMockData) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setData(getMockBook(id));
          return;
        }
        /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
          bookid: id,
        };
        const response = await axios.get(
          `http://localhost:8080/api/v1/books/${id}`,
          { headers }
        );
        setData(response.data.book);
        */
      } catch (error) {
        console.error("Failed to fetch book", error);
        alert("Failed to fetch book details");
      }
    };
    fetchBook();
  }, [id]);

  const handleFavourite = async () => {
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert("[MOCK] Added to favourites");
        return;
      }
      /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id")
      };
      await axios.post(
        `http://localhost:8080/api/v1/favourites/${id}`,
        {},
        { headers }
      );
      alert("Added to favourites");
      */
    } catch (error) {
      console.log(error);
      alert("Failed to add to favourites");
    }
  };

  const handleCart = async () => {
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert("[MOCK] Added to cart");
        return;
      }
      /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id")
      };
      await axios.post(
        `http://localhost:8080/api/v1/cart/${id}`,
        {},
        { headers }
      );
      alert("Added to cart");
      */
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart");
    }
  };

  const handleDelete = async () => { // ✅ FIXED: Renamed from deleteBook to handleDelete to match usage
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        alert("[MOCK] Book deleted");
        navigate("/all-books");
        return;
      }
      /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id")
      };
      await axios.delete(
        `http://localhost:8080/api/v1/books/${id}`,
        { headers }
      );
      alert("Book deleted");
      navigate("/books");
      */
    } catch (error) {
      console.log(error);
      alert("Failed to delete book");
    }
  };

  if (!data) return <Loader />;

  
  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-7">
          <div className="w-full md:w-1/2 flex justify-center bg-zinc-800">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded gap-7 lg:gap-8">
              {" "}
              <img
                src={data.url}
                alt={data.title}
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
                  <Link to={`/updateBook/${id}`} className="bg-white px-6 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:p-0 hover:bg-gray-200 text-black text-lg flex items-center justify-center gap-2">
                    <FaEdit className="text-xl" />
                    <span className="block lg:hidden">Edit</span>
                  </Link>
                  {/* Delete Button */}
                  <button 
                    className="bg-white px-6 py-3 lg:w-14 lg:h-14 lg:rounded-full lg:p-0 hover:bg-gray-200 text-red-600 text-lg flex items-center justify-center gap-2"
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete className="text-xl" />
                    <span className="block lg:hidden">Delete</span>
                  </button>
                </div>
              )}

            </div>
          </div>


          <div className="text-white p-4 w-full lg:w-1/2">
            <h1 className="text-3xl text-zinc-300 font-semibold">{data.title}</h1>
            <p className="text-zinc-400 mt-1 text-lg">by {data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex items-center gap-2 mt-4 text-zinc-400">
              <GrLanguage /> {data.language}
            </p>
            <p className="mt-4 text-2xl font-semibold">Price: ₹{data.price}</p>
          </div>
        </div>
      )}
      {!data && (
        <div className="text-center text-red-400 py-20">
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;