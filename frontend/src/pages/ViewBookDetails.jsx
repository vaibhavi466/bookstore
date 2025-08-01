
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/common/Loader";
import { useParams , useNavigate } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import {MdOutlineDelete} from "react-icons/md";

const ViewDataDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

      const deleteBook = async () => {
        const response = await axios.delete(
            "http://localhost:1000/api/v1/delete-book",
            { 
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: { bookId: id }  // Assuming you need to send the book ID in the request body
            }
        );
        alert(response.data.message);
        navigate("/all-books");
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
                  <button className="bg-red-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center"
                  onClick={deleteBook}>
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
