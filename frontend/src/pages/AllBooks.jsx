// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loader from '../components/Loader/Loader';
// import BookCard from '../components/BookCard/BookCard'; 
// // import { head } from '../../../backend/routes/user';

// const AllBooks = () => {
//   const [Data, setData] = useState([]);
//   const [loading, setLoading] = useState(true); // ✅ added loading state

//   useEffect(() => {
//     const fetchAllBooks = async () => {
//       try {
//         const token = localStorage.getItem("token"); // ✅ fetch token
//         const response = await axios.get('http://localhost:1000/api/v1/get-all-books' ,{
//         headers: {
//           Authorization: `Bearer ${token}` // ✅ add token to headers
//         }
//       }) ;
//         console.log("API response:", response); // ✅ Add this

//         setData(response.data.data);
//         // setData(response.data.books);  // yr ye chatgpt karwaya h upar wala line hata k ye likhwaya h
//       } catch (error) {
//         console.error("Error fetching all books", error.response?.data || error.message);
//       } finally {
//         setLoading(false); // ✅ set loading to false after fetching
//       }
//     };

//     fetchAllBooks();
//   }, []);
//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-zinc-900 h-auto px-12 py-8">
//       <h4 className="text-3xl text-yellow-100 font-semibold mb-6">
//         All Books
//       </h4>

//       {/* {!Data.length ? (
//         <div className="flex items-center justify-center my-8">
//           <Loader />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {Data.map((item, i) => (
//             <div key={i} className="hover:scale-105 transition-transform duration-200">
//               <BookCard data={item} />
//             </div>
//           ))}
//         </div>
//       )} */}

//       {/* chatgpt ne likhwaya h ye wala , original code uppar hai : */}

//       {loading ? ( // ✅ replaced !Data.length with proper loading flag
//         <div className="flex items-center justify-center my-8">
//           <Loader />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {Data.map((item, i) => (
//             <div key={i} className="hover:scale-105 transition-transform duration-200">
//               <BookCard data={item} />
//             </div>
//           ))}
//         </div>
//       )}





//     </div>
//   );
// };

// export default AllBooks;





















// src/pages/AllBooks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader"; // Fix: verify this path is correct in your project
import BookCard from "../components/BookCard/BookCard"; // Fix: BookCard expects prop "data" (see usage in RecentlyAdded)
import { useNavigate } from "react-router-dom"; // Fix: import useNavigate for navigation

// Fix: AllBooks component
const AllBooks = () => {
  const [data, setData] = useState([]); // Fix: start with array
  const [loading, setLoading] = useState(true);
  const BASE = (import.meta.env.VITE_BASE_URL || "http://localhost:1000/api/v1").replace(/\/$/, ""); // Fix: use env
  const navigate = useNavigate(); // Fix: useNavigate hook for navigation
  
  
  useEffect(() => {
    let mounted = true; // Fix: avoid state update after unmount

    const fetchAllBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("📦 Token from localStorage:", token); // Fix: helpful debug, remove later

        // Fix: call the backend route that exists: /get-all-books
        const response = await axios.get(`${BASE}/get-all-books`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        console.log("📚 API Response:", response.data); // Fix: inspect the actual response structure
        // Fix: backend returns { status: "success", data: books }
        const books = response.data?.data || response.data?.books || [];
        if (mounted) setData(books);
      } catch (error) {
        console.error("❌ Error fetching all books", error); // Fix: show any backend or network error
        if (mounted) setData([]); // show empty state on error
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAllBooks();

    return () => {
      mounted = false;
    };
  }, [BASE]);

  if (loading) {
    return (
      <div className="p-8">
        <Loader />
      </div>
    );
  }

  const handleBookClick = (bookId) => {
    navigate(`/view-book-details/${bookId}`); // make sure this route exists in App.jsx or Routes file
  };

  if (loading) {
    return (
      <div className="p-8">
        <Loader />
      </div>
    );
  }




  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Books</h2>

      {data.length === 0 ? (
        <div className="text-zinc-400">No books found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((book) => (
            // Fix: BookCard expects a prop named "data" (as used in RecentlyAdded)
            book && <BookCard key={book._id} data={book} 
            onClick={() => handleBookClick(book._id)}  // Fix: navigate to book details
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
