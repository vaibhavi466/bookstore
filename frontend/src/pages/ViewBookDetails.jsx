// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "../components/common/Loader";
// import { useParams , useNavigate } from "react-router-dom";
// import { GrLanguage } from "react-icons/gr";
// import { FaEdit, FaHeart } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import {MdOutlineDelete} from "react-icons/md";

// const ViewBookDetails = () => {
//     const { id } = useParams(); // id is the book ID
//     const navigate = useNavigate();
//     const [Data, setData] = useState();
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     const role = useSelector((state) => state.auth.role);
//     useEffect(() => {
//         const fetch = async () => {
//             const response = await axios.get(
//                 `http://localhost:1000/api/v1/get-book-by-id/${id}`
//             );
//             setData(response.data.data);
//         };
//         fetch();
//       }, [id]);
//       // const headers = {
//       //   id: localStorage.getItem("id"),
//       //   authorization: `Bearer ${localStorage.getItem("token")}`,
//       //   bookid: id, // This is the book ID
//       // };

//       // const handleFavourite = async () => {
//       //   console.log("Headers being sent:", headers); 
//       //   try{
//       //       const response = await axios.put(
//       //         "http://localhost:1000/api/v1/add-book-to-favourite",
//       //       {},
//       //       { headers }
//       //     );
//       //     alert(response.data.message || "Book successfully added to favourites!");
//       //   } catch (error) {
//       //     console.error("Error adding book to favourites:", error);
//       //     const errorMessage = error.response?.data?.message || "Failed to add to favourites. Please ensure you are logged in.";
//       //     alert(errorMessage);
//       //   }
//       // };

//       const handleFavourite = async () => {
//         if (!isLoggedIn) {
//           alert("Please log in to add books to favorites!");
//           navigate("/login");
//           return;
//         }
//         if (role !== "user") {
//           alert("Only users can add books to favorites!");
//           return;
//         }
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("id");
//         if (!token || !userId) {
//           alert("Authentication required. Please log in again.");
//           navigate("/login");
//           return;
//         }
//         console.log("Adding to favorites - User ID:", userId, "Book ID:", id);
//         try {
//           const response = await axios.put(
//             "http://localhost:1000/api/v1/add-book-to-favourite",
//               { 
//                 bookId: id,
//                 userId: userId 
//               }, // Send data in request body
//               { 
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                   'Content-Type': 'application/json'
//                 }
//               }
//           );
            
//           console.log("Favorites response:", response.data);
//           alert(response.data.message || "Book successfully added to favourites!");
//         }
//         catch (error) {
//           console.error("Error adding book to favourites:", error);
            
//           // More detailed error handling
//           if (error.response) {
//             // Server responded with error status
//             console.error("Server error:", error.response.data);
//             const errorMessage = error.response?.data?.message || "Failed to add to favourites.";
//             alert(errorMessage);
                
//             // If unauthorized, redirect to login
//             if (error.response.status === 401) {
//               navigate("/login");
//             }
//           } 
//           else if (error.request) {
//             // Request made but no response received
//             console.error("Network error:", error.request);
//             alert("Network error. Please check your connection.");
//           } 
//           else {
//             // Something else happened
//             console.error("Error:", error.message);
//             alert("An unexpected error occurred.");
//           }
//         }
//       };


//       const handleCart = async () => {
//         if (!isLoggedIn) {
//             alert("Please log in to add books to cart!");
//             navigate("/login");
//             return;
//         }
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("id");
//         if (!token || !userId) {
//             alert("Authentication required. Please log in again.");
//             navigate("/login");
//             return;
//         }

//         try{
//           const response = await axios.put(
//             "http://localhost:1000/api/v1/add-to-cart",
//             { 
//               bookId: id,
//               userId: userId // Added user ID
//             },  // Assuming you want to send the book ID
//             {
//                 headers: {
//                   // Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming you need auth
//                   Authorization: `Bearer ${token}`, // uppar wala original , ye wala chatgpt , fav add krne k liye
//                   'Content-Type': 'application/json'
//                 }
//             }
//         );
//         alert(response.data.message);
//         } catch (error) {
//           console.error("Error adding book to cart:", error);
//           const errorMessage = error.response?.data?.message || "Failed to add to cart. Please ensure you are logged in.";
//           alert(errorMessage);
//           if (error.response?.status === 401) {
//                 navigate("/login");
//           }
//         }
        
//       };

//       const deleteBook = async () => {
//         // Add confirmation dialog
//         if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
//             return;
//         }
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("id");

//         if (!token || !userId) {
//             alert("Authentication required. Please log in again.");
//             return;
//         }

//         try {
//           const response = await axios.delete(
//             "http://localhost:1000/api/v1/delete-book",
//             { 
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json'
//                 },
//                 data: {
//                    bookId: id ,
//                    userId: userId
//                 }  // Assuming you need to send the book ID in the request body
//             }
//         );
//         alert(response.data.message);
//         navigate("/all-books");
//         }
//         catch (error) {
//             console.error("Error deleting book:", error);
//             const errorMessage = error.response?.data?.message || "Failed to delete book.";
//             alert(errorMessage);
//         }
        
        
//       };



//   return (
//     <>
//       {Data && (
//         <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
//           <div className="w-full lg:w-3/6">
//             {" "}
//             <div className="flex justify-around bg-zinc-800 p-12 rounded">
//               {" "}
//               <img
//               src={Data.url}
//               alt="/"
//               className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
//               />
//               {isLoggedIn === true && role === "user" && (
//                 <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
//                   <button className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center"
//                   onClick={handleFavourite}>
//                     <FaHeart />
//                     <span className="ms-4 block lg:hidden">Favorites</span>
//                   </button>
//                   <button className="bg-blue-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center" 
//                   onClick={handleCart}>
//                     <FaShoppingCart />
//                     <span className="ms-4 block lg:hidden">Add to cart</span>
//                   </button>
//                 </div>
//               )}
//               {isLoggedIn === true && role === "admin" && (
//                 <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
//                   <button className="bg-white rounded lg:rounded-full text-3xl p-3  flex items-center justify-center">
//                     <FaEdit />{" "}
//                     <span className="ms-4 block lg:hidden">Edit</span>
//                   </button>
//                   <button className="bg-red-500 rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 text-white flex items-center"
//                   onClick={deleteBook}>
//                     <MdOutlineDelete />
//                     <span className="ms-4 block lg:hidden">Delete</span>
//                   </button>
//                 </div>
//               )}


//             </div>
//           </div>
//           <div className="p-4 w-full lg:w-3/6">
//             <h1 className="text-4xl text-zinc-300 font-semibold">
//               {Data.title}
//             </h1>
//             <p className="text-zinc-400 mt-1">by {Data.author}</p>
//             <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
//             <p className="flex mt-4 items-center justify-start text-zinc-400">
//               <GrLanguage className="me-3" /> {Data.language}
//             </p>
//             <p className="mt-4 text-zinc-100 text-3xl font-semibold">
//               Price : ₹ {Data.price}{" "}
//             </p>
//           </div>
//         </div>
//       )}
//       {!Data && (
//         <div className="h-screen bg-zinc-900 flex items-center justify-center">
//           <Loader />
//         </div>
//       )}

//     </>
// );

// };

// export default ViewBookDetails;














// ViewBookDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/common/Loader";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

/**
 * Robust ViewBookDetails:
 * - Sends both header-style and body-style payloads to improve compatibility with various backends.
 * - Uses VITE_BASE_URL if present, falls back to localhost.
 * - Provides fallback image when book.url is invalid or points to a local file:// path.
 * - Emits CustomEvents so lists can refresh (book:added-to-fav, book:added-to-cart, book:deleted).
 *
 * NOTE: Remove console.logs in production. Keep network tab open to inspect failing request/response bodies.
 */

const BASE = import.meta.env.VITE_BASE_URL || "http://localhost:1000/api/v1";
const api = axios.create({ baseURL: BASE, headers: { "Content-Type": "application/json" } });

// fallback when book.url is broken/local
const PLACEHOLDER_IMG = "https://via.placeholder.com/420x600?text=No+Image";

export default function ViewBookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // redux auth (make sure your store provides these)
  const auth = useSelector((state) => state.auth || {});
  const isLoggedIn = !!auth.isLoggedIn;
  const role = auth.role;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [faveLoading, setFaveLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // robust token/userId retrieval
  const getAuthInfo = () => {
    const tokenCandidates = [
      auth?.token,
      localStorage.getItem("token"),
      localStorage.getItem("authToken"),
      localStorage.getItem("accessToken"),
      localStorage.getItem("jwt"),
    ];
    const token = tokenCandidates.find(Boolean) || null;

    const reduxUser = auth?.user || null;
    let userIdCandidates = [
      reduxUser?.id ?? reduxUser?._id ?? null,
      localStorage.getItem("id"),
      localStorage.getItem("userId"),
      localStorage.getItem("_id"),
    ];

    // attempt to parse local 'user' JSON if present
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        userIdCandidates.push(parsed?.id ?? parsed?._id ?? null);
      }
    } catch (e) {
      // ignore parse error
      console.log("Failed to parse user from localStorage", e);
    }

    const userId = userIdCandidates.find(Boolean) || null;
    return { token, userId };
  };

  // Set Authorization header on api instance (keeps requests consistent)
  useEffect(() => {
    const { token } = getAuthInfo();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [auth]); // run whenever auth slice changes

  // fetch book (no AbortController passed to axios to avoid compatibility issues)
  useEffect(() => {
    let mounted = true;
    const fetchBook = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await api.get(`/get-book-by-id/${id}`);
        if (!mounted) return;
        setBook(res.data?.data ?? null);
      } catch (err) {
        console.error("Failed to fetch book:", err);
        if (!mounted) return;
        setFetchError("Failed to load book. Check console/network for details.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchBook();

    return () => {
      mounted = false;
    };
  }, [id]);

  // helper to resolve image; prevents file:/// loading
  const resolveImage = (url) => {
    if (!url) return PLACEHOLDER_IMG;
    const lower = String(url).toLowerCase();
    if (lower.startsWith("http://") || lower.startsWith("https://")) return url;
    // Sometimes backend returns relative path like '/uploads/abc.jpg'
    if (url.startsWith("/")) {
      // try to serve relative to backend if you host images there:
      // return `${BASE.replace(/\/api\/v1\/?$/, "")}${url}`;
      // But safer: try frontend origin then fallback to placeholder
      try {
        return window.location.origin + url;
      } catch (e) {
        console.error("Failed to resolve relative image URL", e);
        return PLACEHOLDER_IMG;
      }
    }
    // if url starts with file:// or contains 'src/assets', don't attempt file:/// load -> use placeholder
    if (lower.startsWith("file://") || lower.includes("src/assets")) return PLACEHOLDER_IMG;

    // as a last resort, return url (could still fail)
    return url;
  };

  // Prevent redirect loop by only redirecting to login when needed and not when we're already on /login
  const ensureTokenOrRedirect = (intent = "perform this action") => {
    const { token } = getAuthInfo();
    if (!token) {
      alert("Please log in to " + intent + ".");
      if (!location.pathname.startsWith("/login")) navigate("/login");
      return null;
    }
    return token;
  };

  // shared helper to build headers (include both Authorization and authorization, include id/bookid header names)
  const buildHeaders = (token, userId) => {
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": "application/json",
    };
    if (userId) headers.id = userId;
    // include bookid header because older code had it and backend may expect it
    headers.bookid = id;
    return headers;
  };

  // Add to favorites — send both header-style and body-style to maximize compatibility with server
  const handleFavourite = async () => {
    if (!isLoggedIn) {
      ensureTokenOrRedirect("add to favorites");
      return;
    }
    if (role !== "user") {
      alert("Only users can add books to favorites.");
      return;
    }

    const { token, userId } = getAuthInfo();
    if (!token) {
      ensureTokenOrRedirect("add to favorites");
      return;
    }

    setFaveLoading(true);
    try {
      const payload = { bookId: id };
      if (userId) payload.userId = userId;

      const headers = buildHeaders(token, userId);

      // debug logging — remove in production
      console.log("[FAV REQUEST] url:", `${BASE}/add-book-to-favourite`);
      console.log("[FAV REQUEST] headers:", headers);
      console.log("[FAV REQUEST] body:", payload);

      // try to call API; some backends expect empty body and headers only; sending both is more compatible
      const res = await api.put("/add-book-to-favourite", payload, { headers });

      console.log("[FAV RESPONSE]", res?.status, res?.data);
      // Optimistically update UI
      setBook((b) => (b ? { ...b, isFavorited: true } : b));
      try {
        window.dispatchEvent(new CustomEvent("book:added-to-fav", { detail: { bookId: id } }));
      } catch (e) {
        console.error("Failed to emit book:added-to-fav event", e);
      }
      alert(res.data?.message ?? "Added to favourites.");
    } catch (err) {
      console.error("Add to favourite failed:", err, err?.response?.data);
      const serverMsg = err?.response?.data?.message ?? err?.response?.data ?? null;
      // If server returned 500, show more helpful message instead of redirecting
      if (err?.response?.status === 401) {
        // token invalid/expired -> force re-login
        delete api.defaults.headers.common["Authorization"];
        alert("Session expired. Please sign in again.");
        navigate("/login");
      } else if (err?.response?.status >= 500) {
        alert("Server error while adding to favourites. Check backend logs. " + (serverMsg ? `Server says: ${serverMsg}` : ""));
      } else {
        alert(serverMsg ?? "Failed to add to favourites. See console/network for details.");
      }
    } finally {
      setFaveLoading(false);
    }
  };

  // Add to cart — similar compatibility approach
  const handleCart = async () => {
    if (!isLoggedIn) {
      ensureTokenOrRedirect("add to cart");
      return;
    }

    const { token, userId } = getAuthInfo();
    if (!token) {
      ensureTokenOrRedirect("add to cart");
      return;
    }

    setCartLoading(true);
    try {
      const payload = { bookId: id };
      if (userId) payload.userId = userId;
      const headers = buildHeaders(token, userId);

      console.log("[CART REQUEST] url:", `${BASE}/add-to-cart`);
      console.log("[CART REQUEST] headers:", headers);
      console.log("[CART REQUEST] body:", payload);

      const res = await api.put("/add-to-cart", payload, { headers });

      console.log("[CART RESPONSE]", res?.status, res?.data);

      setBook((b) => (b ? { ...b, isInCart: true } : b));
      try {
        window.dispatchEvent(new CustomEvent("book:added-to-cart", { detail: { bookId: id } }));
      } catch (e) {
        console.error("Failed to emit book:added-to-cart event", e);
      }
      alert(res.data?.message ?? "Added to cart.");
    } catch (err) {
      console.error("Add to cart failed:", err, err?.response?.data);
      const serverMsg = err?.response?.data?.message ?? err?.response?.data ?? null;
      if (err?.response?.status === 401) {
        delete api.defaults.headers.common["Authorization"];
        alert("Session expired. Please sign in again.");
        navigate("/login");
      } else if (err?.response?.status >= 500) {
        alert("Server error while adding to cart. Check backend logs. " + (serverMsg ? `Server says: ${serverMsg}` : ""));
      } else {
        alert(serverMsg ?? "Failed to add to cart. See console/network for details.");
      }
    } finally {
      setCartLoading(false);
    }
  };

  // Admin delete
  const deleteBook = async () => {
    if (role !== "admin") {
      alert("Only admins can delete books.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) return;
    const { token, userId } = getAuthInfo();
    if (!token) {
      ensureTokenOrRedirect("delete this book");
      return;
    }

    setDeleteLoading(true);
    try {
      const headers = buildHeaders(token, userId);
      const config = { headers, data: { bookId: id, ...(userId ? { userId } : {}) } };

      console.log("[DELETE REQUEST] url:", `${BASE}/delete-book`, "config:", config);

      const res = await api.delete("/delete-book", config);

      console.log("[DELETE RESPONSE]", res?.status, res?.data);
      try {
        window.dispatchEvent(new CustomEvent("book:deleted", { detail: { bookId: id } }));
      } catch (e) {
        console.error("Failed to emit book:deleted event", e);
      }
      alert(res.data?.message ?? "Book deleted.");
      navigate("/all-books");
    } catch (err) {
      console.error("Delete failed:", err, err?.response?.data);
      const msg = err?.response?.data?.message ?? "Failed to delete book.";
      if (err?.response?.status === 401) {
        delete api.defaults.headers.common["Authorization"];
        navigate("/login");
      }
      alert(msg);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = () => {
    if (role !== "admin") {
      alert("Only admins can edit books.");
      return;
    }
    navigate(`/edit-book/${id}`);
  };

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center text-zinc-100">
        <div>
          <p className="mb-4">{fetchError}</p>
          <button className="px-4 py-2 bg-blue-600 rounded" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-zinc-300">Book not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full lg:w-3/6">
        <div className="flex justify-around bg-zinc-800 p-12 rounded">
          <img src={resolveImage(book.url)} alt={book.title ?? "book"} className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded object-contain" />

          <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 gap-4">
            {isLoggedIn && role === "user" && (
              <>
                <button disabled={faveLoading} onClick={handleFavourite} className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center disabled:opacity-50">
                  <FaHeart />
                </button>

                <button disabled={cartLoading} onClick={handleCart} className="bg-blue-500 rounded-full text-3xl p-3 text-white flex items-center disabled:opacity-50">
                  <FaShoppingCart />
                </button>
              </>
            )}

            {isLoggedIn && role === "admin" && (
              <>
                <button onClick={handleEdit} className="bg-white rounded-full text-3xl p-3 flex items-center justify-center">
                  <FaEdit />
                </button>

                <button disabled={deleteLoading} onClick={deleteBook} className="bg-red-500 rounded-full text-3xl p-3 text-white flex items-center disabled:opacity-50">
                  <MdOutlineDelete />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 w-full lg:w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">{book.title}</h1>
        <p className="text-zinc-400 mt-1">by {book.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{book.desc}</p>
        <p className="flex mt-4 items-center justify-start text-zinc-400">
          <GrLanguage className="mr-3" /> {book.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price : ₹ {book.price}</p>

        <div className="text-sm text-zinc-400 mt-2">
          {book.isFavorited && <div>⭐ This book appears in your favorites (local view)</div>}
          {book.isInCart && <div>🛒 This book appears in your cart (local view)</div>}
        </div>
      </div>
    </div>
  );
}
