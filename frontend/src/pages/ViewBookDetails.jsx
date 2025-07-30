// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa"; // ✅ FIXED: Added missing FaShoppingCart and FaEdit imports
// import { MdOutlineDelete } from "react-icons/md";
// import { GrLanguage } from "react-icons/gr"; // ✅ FIXED: Added missing GrLanguage import
// import Loader from "../components/common/Loader";
// import { useNavigate } from "react-router-dom";
// const ViewBookDetails = () => {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const useMockData = true; // false -> when backend is ready
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("isLoggedIn") === "true"
//   );
//   const [role, setRole] = useState(localStorage.getItem("role")?.trim() || "user");


//   useEffect(() => {
//     // ✅ Dynamically fetch role and login state
//     setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
//     setRole(localStorage.getItem("role")?.trim() || "user");
//   }, []);

//   useEffect(() => {
//   const loggedIn = localStorage.getItem("isLoggedIn");
//   const userRole = localStorage.getItem("role");

//   console.log("isLoggedIn from storage:", loggedIn); // Should log "true"
//   console.log("role from storage:", userRole);       // Should log "admin" or "user"

//   setIsLoggedIn(loggedIn === "true");
//   setRole(userRole?.trim() || "user");
//   }, []);


  
//   const getMockBook = (id) => ({
//     _id: id,
//     title: "Atomic Habits",
//     author: "James Clear",
//     desc: "An easy & proven way to build good habits & break bad ones.",
//     price: 499,
//     url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", // ✅ FIXED: Changed 'image' to 'url' to match your UI usage
//     language: "English", // ✅ FIXED: Added missing language field
//     quantity: 10,
//     createdAt: new Date().toISOString()
//   });
  
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         if (useMockData) {
//           await new Promise(resolve => setTimeout(resolve, 800));
//           setData(getMockBook(id));
//           return;
//         }
//         /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)*/
//         const headers = {
//           id: localStorage.getItem("id"),
//           authorization: `Bearer ${localStorage.getItem("token")}`,
//           bookid: id,
//         };
//         const response = await axios.get(
//           `http://localhost:8080/api/v1/books/${id}`,
//           { headers }
//         );
//         setData(response.data.book);
      
//       } catch (error) {
//         console.error("Failed to fetch book", error);
//         alert("Failed to fetch book details");
//       }
//     };
//     fetchBook();
//   }, [id]);

//   const handleFavourite = async () => {
//     try {
//       if (useMockData) {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         alert("[MOCK] Added to favourites");
//         return;
//       }
//       /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)*/
//       const headers = {
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//         id: localStorage.getItem("id")
//       };
//       await axios.post(
//         `http://localhost:8080/api/v1/favourites/${id}`,
//         {},
//         { headers }
//       );
//       alert("Added to favourites");
      
//     } catch (error) {
//       console.log(error);
//       alert("Failed to add to favourites");
//     }
//   };

//   const handleCart = async () => {
//     try {
//       if (useMockData) {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         alert("[MOCK] Added to cart");
//         return;
//       }
//       /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)*/
//       const headers = {
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//         id: localStorage.getItem("id")
//       };
//       await axios.post(
//         `http://localhost:8080/api/v1/cart/${id}`,
//         {},
//         { headers }
//       );
//       alert("Added to cart");
      
//     } catch (error) {
//       console.log(error);
//       alert("Failed to add to cart");
//     }
//   };

//   const handleDelete = async () => { // ✅ FIXED: Renamed from deleteBook to handleDelete to match usage
//     try {
//       if (useMockData) {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         alert("[MOCK] Book deleted");
//         navigate("/all-books");
//         return;
//       }
//       /* BACKEND IMPLEMENTATION (COMMENTED OUT FOR NOW)*/
//       const headers = {
//         authorization: `Bearer ${localStorage.getItem("token")}`,
//         id: localStorage.getItem("id")
//       };
//       await axios.delete(
//         `http://localhost:8080/api/v1/books/${id}`,
//         { headers }
//       );
//       alert("Book deleted");
//       navigate("/books");
      
//     } catch (error) {
//       console.log(error);
//       alert("Failed to delete book");
//     }
//   };

//   if (!data) return <Loader />;






import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/common/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import {MdOutlineDelete} from "react-icons/md";

const ViewDataDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:1000/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        };
        fetch();
      }, []);
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };

      const handleFavourite = async () => {
        const response = await axios.put(
          "http://localhost:1000/api/v1/add-book-to-favourite",
          {},
          { headers }
        );
        alert(response);
      };
      const handleCart = async () => {
        const response = await axios.put(
            "http://localhost:1000/api/v1/add-to-cart",
            { bookId: id },  // Assuming you want to send the book ID
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming you need auth
                }
            }
        );
        alert(response.data.message);
      };



  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            {" "}
            <div className="flex justify-around bg-zinc-800 p-12 rounded">
              {" "}
              <img
              src={Data.url}
              alt="/"
              className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center"
                  onClick={handleFavourite}>
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Favorites</span>
                  </button>
                  <button className="bg-blue-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center" 
                  onClick={handleCart}>
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button className="bg-white rounded lg:rounded-full text-3xl p-3  flex items-center justify-center">
                    <FaEdit />{" "}
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </button>
                  <button className="bg-red-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center">
                    <MdOutlineDelete />
                    <span className="ms-4 block lg:hidden">Delete</span>
                  </button>
                </div>
              )}


            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}

    </>
);

};

export default ViewDataDetails;