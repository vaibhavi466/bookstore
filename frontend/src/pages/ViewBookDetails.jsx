import React, { useState } from "react"; // ✅ Added useState
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
// import axios from "axios";
// import React, { useState } from "react"; // ✅ Added useState

// ✅ Dummy data
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

  const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
  const role =useSelector((state)=>state.auth.role) ;
  console.log(isLoggedIn);
  console.log(role);


  // real time data fetching
  // useEffect(() =>{
  //   const fetch = async() =>{
  //     const response = await axios.get(
  //       `http://localhost:1000/api/v1/get-book-by-id/${id}`
  //     );
  //     setAddedToCart(response.data.data);
  //   };
  //   fetch();
  // } , []) ;

  if (!Data) {
    return (
      <div className="text-center text-red-400 py-20">
        Book not found for ID: {id}
      </div>
    );
  }

  // ✅ State for icon toggling
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
      {/* ✅ Left Section: Image + Icons */}
      <div className="relative bg-zinc-800 rounded p-4 w-full md:w-1/2 flex justify-center items-center">
        <img
          src={Data.url}
          alt={Data.title}
          className="h-[50vh] md:h-[65vh] lg:h-[70vh] rounded shadow-lg object-contain"
        />

        {/* ✅ Icons fixed at top-right for all screen sizes */}
        <div className="absolute top-4 right-4 flex flex-col gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`rounded-full text-xl p-2 transition ${
              liked ? "bg-pink-600 text-white" : "bg-white text-black"
            }`}
          >
            <FaHeart />
          </button>
          <button
            onClick={() => setAddedToCart(!addedToCart)}
            className={`rounded-full text-xl p-2 transition ${
              addedToCart ? "bg-blue-600 text-white" : "bg-white text-black"
            }`}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      {/* ✅ Right Section: Book Info */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-4xl text-zinc-100 font-bold">{Data.title}</h1>
        <p className="text-zinc-400 mt-2 text-lg">by {Data.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
        <p className="flex items-center gap-2 mt-4 text-zinc-400">
          <GrLanguage /> {Data.language}
        </p>
        <p className="mt-8 text-3xl font-semibold text-zinc-100">
          Price : ₹ {Data.price}/-b b
        </p>

        
      </div>
    </div>
  );
};

export default ViewBookDetails;
