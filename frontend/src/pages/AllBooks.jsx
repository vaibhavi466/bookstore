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





















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("📦 Token from localStorage:", token);

        const response = await axios.get("http://localhost:5000/api/books/get-all-books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📚 API Response:", response.data);

        setData(response.data.books);
      } catch (error) {
        console.error("❌ Error fetching all books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>All Books</h2>
      <div>
        {data.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;

