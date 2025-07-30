<<<<<<< HEAD
// import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

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
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) ;
  // const role = useSelector((state) => state.auth.role) ;
  // useEffect(() => {
  //   const fetch = async() => {
  //     const response = await axios.get(
  //       `http://localhost:1000/api/v1/get-book-by-id/${id}`
  //     );
  //     setData(response.data.data);
  //   };
  //   fetch() ;
  // }, []) ;

  // const headers = {
  //   id: localStorage.getItem("id"),
  //   authorization: `Bearer ${localStorage.getItem("token")}`,
  //   bookid: id,
  // };

  // const handleFavourite = async () => {
  //     const response = await axios.put(
  //       `http://localhost:1000/api/v1/add-book-to-favourite`,
  //       {},
  //       { headers }
  //     );
  //     alert(response.data.message);
  // };

  // const handleCart = async () => {
  //   const response = await axios.put(
  //       `http://localhost:1000/api/v1/add-to-cart`,
  //       {},
  //       { headers }
  //     );
  //   alert(response.data.message);
  // };


  
  if (!Data) {
    return (
      <div className="text-center text-red-400 py-20">
        Book not found for ID: {id}
      </div>
    );
  }

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
            <div className="flex justify-center">
              <img
                src={Data.url}
                alt={Data.title}
                className="h-[50vh] lg:h-[70vh] rounded"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">{Data.title}</h1>
              <p className="text-zinc-400 mt-1 text-lg">by {Data.author}</p>
              <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
              <p className="flex items-center gap-2 mt-4 text-zinc-400">
                <GrLanguage /> {Data.language}
              </p>
              <p className="mt-4 text-2xl font-semibold">Price: ₹{Data.price}</p>

              <div className="mt-6 flex gap-4">
                <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                  Buy Now
                </button>
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
=======
import React from 'react'

const ViewBookDetails = () => {
  return (
    <div className="px-12 py-8 bg-zinc-900 flex">
        <div className="bg-zinc-800"></div>

    </div>
  )
}

export default ViewBookDetails;
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20
