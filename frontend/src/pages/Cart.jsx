// import React, { useState, useEffect } from "react";
// import Loader from "../components/Loader/Loader";
// import axios from "axios";
// import{AiFillDelete} from "react-icons/ai";
// import { useNavigate } from "react-router-dom"

// const Cart=()=>{

//   const [Cart,setCart]=useState(); //by defalut cart is empty
//   const [Total,setTotal]=useState(0);
//   const navigate = useNavigate();
//   const headers={
//     id:localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };
//   useEffect(()=>{
//     const fetch =async()=>{
//       // const res=await axios.get(
//       //   "http://localhost:1000/api/v1/get-user-cart",
//       //   {headers}
//       // );

//       const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
// setCart(res.data.data);

//       try {
//         const res = await axios.get('http://localhost:1000/api/v1/get-user-cart', { headers });
//         const cartItems = res.data.data || [];
//         setCart(cartItems);
//         setTotal(cartItems.reduce((sum, item) => sum + (item.price || 0), 0));
//         } catch (error) {
//         console.error('Error fetching cart:', error);
//         setCart([]);
//       }
//     };
//     fetch();
//   },[]);  //dabba[] se Cart hata diya 



//     try {
//       await axios.put(`http://localhost:1000/api/v1/delete-from-cart/${itemId}`, {}, { headers });
//       // Update frontend cart after deletion

//       const updatedCart = Cart.filter((item) => item.id !== itemId);
//       setCart(updatedCart);
//       setTotal(updatedCart.reduce((sum, item) => sum + item.price, 0));
//     } catch (error) {
//       console.error('Failed to delete item:', error);
//     }
//   };

//   useEffect(()=>{
//     if(Cart && Cart.length >0){
//       let total=0;
//       Cart.map((items)=>{  //iteration on the map
//         total += items.price;
//       });
//       setTotal(total);
//       //total=0;
//     }
//   },[Cart]);

//   const PlaceOrder =async()=>{
//     try{
//       const response=await axios.post(
//         `http://localhost:1000/api/v1/place-order`,
//         {order:Cart},
//         {headers}
//       );
//       alert(response.data.message);
//       navigate("/profile/orderHistory");
//     } catch(error){
//       console.log(error);
//     }
//   };

//   return (
//     <div className="bg-zinc-900 px-12 h-screen">
//       {!Cart && <Loader />}
//       {Cart && Cart.length === 0 && (
//         <div className='h-screen'>
//           <div className='h-[100%] flex items-center justify-center flex-col'>
//             <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
//               Empty Cart
//             </h1>

//             <img
//               src="/empty-cart.png"
//               alt="empty cart"
//               className='lg:h-[50vh]'
//             />

//           </div>
//         </div>
//       )}
//       {Cart && Cart.length > 0 && (
//         <>
//           <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">
//             Your Cart 
//           </h1>

//           {Cart.map((item,i) => (
//             <div key={i} className="bg-zinc-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 shadow-md"
//             >
//               <img
//                 src={item.url}
//                 alt={item.title}
//                 className="h-[20vh] md:h-[15vh] object-cover rounded-lg"
//               />
//               <div className="w-full md:w-auto">
//                 <h2 className="text-2xl font-semibold text-zinc-100 text-start mt-2 md:mt-0">
//                   {item.title}
//                 </h2>
//                 <p className="text-zinc-300 mt-2 hidden lg:block">
//                   {item.desc?.slice(0, 65)}...
//                 </p>
//                 <p className="text-zinc-100 mt-2 font-semibold">₹ {item.price}</p>
//           </div>
//           </div>
//           ))}




//         </>
//       )}
//       <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">
//         Your Cart
//       </h1>

//       <div className="flex flex-col gap-6 max-w-3xl mx-auto">
//         {Cart.map((item, i) => (
//           <div
//             className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
//             key={i}
//           >
//             <img
//               src={item.url}
//               alt="/"
//               className="h-[20vh] md:h-[10vh] object-cover"
//             />
//             <div className="w-full md:w-auto">
//               <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
//                 {item.title}
//               </h1>
//               <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
//                 {item.desc.slice(0,100)}...
//               </p>
//               <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:block">
//                 {item.desc.slice(0,65)}...
//               </p>
//               <p className="text-normal text-zinc-300 mt-2 block md:hidden">
//                 {item.desc.slice(0,100)}...
//               </p>
//             </div>
//             <div className="flex mt-4 w-full md:w-auto items-center justify-between">
//               <h2 className="text-zinc-100 text-3xl font-semibold flex">
//                  Rs. {item.price}
//               </h2>
//               <button
//                 className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
//                 onClick={()=> deleteItem(item._id)}
//               >
//                 <AiFillDelete/>
//               </button>
//             </div>
//           </div>

//         ))}
//       </>
//     )}
//     {Cart && Cart.length>0 &&(
//       <div className="mt-4 w-full flex items-center justify-end">
//         <div className="p-4 bg-zinc-800 rounded">
//           <h1 className="text-3xl text-zinc-200 font-semibold">
//             Total amount
//           </h1>
//           <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
//             <h2>{Cart.length} books</h2> <h2> Rs {Total}</h2>
//           </div>
//           <div className="w-[100%] mt-3">
//             <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
//             onClick={PlaceOrder}
//             >
//               Place your order
//             </button>

//           </div>
//         </div>
//       </div>
//     )}
//     </div>
//   );
// }
// export default Cart;







































// ye neeche wala ekdam sahi hai , isko comment isliye kiye h kyuke chatgpt ne dusara cart ka code diya h add to cart button me kuch dikkat h isiliye

// import React, { useState, useEffect } from "react";
// import Loader from "../components/Loader/Loader";
// import axios from "axios";
// import { AiFillDelete } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cart, setCart] = useState(null); // default null (loading state)
//   const [total, setTotal] = useState(0);
//   const navigate = useNavigate();

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   // Fetch cart data
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
//         const cartItems = res.data.data || [];
//         setCart(cartItems);
//         setTotal(cartItems.reduce((sum, item) => sum + (item.price || 0), 0));
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//         setCart([]);
//       }
//     };
//     fetchCart();
//   }, []);

//   // Delete item from cart
//   const deleteItem = async (itemId) => {
//     try {
//       await axios.put(`http://localhost:1000/api/v1/delete-from-cart/${itemId}`, {}, { headers });

//       // Update frontend state
//       const updatedCart = cart.filter((item) => item._id !== itemId);
//       setCart(updatedCart);
//       setTotal(updatedCart.reduce((sum, item) => sum + (item.price || 0), 0));
//     } catch (error) {
//       console.error("Failed to delete item:", error);
//     }
//   };

//   // Place order
//   const placeOrder = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:1000/api/v1/place-order",
//         { order: cart },
//         { headers }
//       );
//       alert(response.data.message);
//       navigate("/profile/orderHistory");
//     } catch (error) {
//       console.error("Order failed:", error);
//     }
//   };

//   return (
//     <div className="bg-zinc-900 px-12 h-screen">
//       {!cart && <Loader />}

//       {cart && cart.length === 0 && (
//         <div className="h-screen">
//           <div className="h-[100%] flex items-center justify-center flex-col">
//             <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
//               Empty Cart
//             </h1>
//             <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
//           </div>
//         </div>
//       )}

//       {cart && cart.length > 0 && (
//         <>
//           <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">
//             Your Cart
//           </h1>

//           <div className="flex flex-col gap-6 max-w-3xl mx-auto">
//             {cart.map((item, i) => (
//               <div
//                 className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
//                 key={i}
//               >
//                 <img
//                   src={item.url}
//                   alt={item.title}
//                   className="h-[20vh] md:h-[10vh] object-cover rounded-lg"
//                 />
//                 <div className="w-full md:w-auto">
//                   <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
//                     {item.title}
//                   </h1>
//                   <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
//                     {item.desc?.slice(0, 100)}...
//                   </p>
//                   <p className="text-normal text-zinc-300 mt-2 block md:hidden">
//                     {item.desc?.slice(0, 65)}...
//                   </p>
//                 </div>
//                 <div className="flex mt-4 w-full md:w-auto items-center justify-between">
//                   <h2 className="text-zinc-100 text-3xl font-semibold flex">
//                     Rs. {item.price}
//                   </h2>
//                   <button
//                     className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
//                     onClick={() => deleteItem(item._id)}
//                   >
//                     <AiFillDelete />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart total + Place order */}
//           <div className="mt-4 w-full flex items-center justify-end">
//             <div className="p-4 bg-zinc-800 rounded">
//               <h1 className="text-3xl text-zinc-200 font-semibold">Total amount</h1>
//               <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
//                 <h2>{cart.length} books</h2> <h2> Rs {total}</h2>
//               </div>
//               <div className="w-[100%] mt-3">
//                 <button
//                   className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
//                   onClick={placeOrder}
//                 >
//                   Place your order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;






















// ye chatgpt wala cart h (100% sahi kaam kr raha h yahi filahl): 
// Cart.jsx (fixed: ensures loading is cleared on all code paths)
import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BASE = import.meta.env.VITE_BASE_URL || "http://localhost:1000/api/v1";
const PLACEHOLDER_IMG = "https://via.placeholder.com/420x600?text=No+Image";

const Cart = () => {
  const [cart, setCart] = useState(null); // null = loading, [] = empty
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth || {});

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
    const userIdCandidates = [
      reduxUser?.id ?? reduxUser?._id ?? null,
      localStorage.getItem("id"),
      localStorage.getItem("userId"),
      localStorage.getItem("_id"),
    ];
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        userIdCandidates.push(parsed?.id ?? parsed?._id ?? null);
      }
    } catch (e) {
      // ignore parse error
      console.log("Failed to parse user from localStorage", e);
    }
    const userId = userIdCandidates.find(Boolean) || null;
    return { token, userId };
  };

  const buildHeaders = (token, userId) => {
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": "application/json",
    };
    if (userId) headers.id = userId;
    return headers;
  };

  const resolveImage = (url) => {
    if (!url) return PLACEHOLDER_IMG;
    const s = String(url).toLowerCase();
    if (s.startsWith("http://") || s.startsWith("https://")) return url;
    if (s.startsWith("/")) {
      try {
        return window.location.origin + url;
      } catch {
        return PLACEHOLDER_IMG;
      }
    }
    if (s.startsWith("file://") || s.includes("src/assets")) return PLACEHOLDER_IMG;
    return url;
  };

  const computeTotalAndSet = (items) => {
    const t = items.reduce((sum, it) => sum + (Number(it.price) || 0), 0);
    setTotal(t);
    setCart(items);
  };

  useEffect(() => {
    let mounted = true;

    const fetchCart = async () => {
      setLoading(true);
      setCart(null);
      setTotal(0);

      const { token, userId } = getAuthInfo();
      const headers = buildHeaders(token, userId);

      // Attempt 1: GET with params
      try {
        console.log("[CART] Attempt 1: GET with params", { url: `${BASE}/get-user-cart`, params: { userId }, headers });
        const res = await axios.get(`${BASE}/get-user-cart`, { params: { userId }, headers });
        if (!mounted) return;
        const items = res.data?.data || res.data || [];
        computeTotalAndSet(items);
        setLoading(false);
        return;
      } catch (err1) {
        console.warn("[CART] Attempt 1 failed:", err1?.response?.status ?? err1.message);
      }

      // Attempt 2: GET with header
      try {
        console.log("[CART] Attempt 2: GET with header", { url: `${BASE}/get-user-cart`, headers });
        const res = await axios.get(`${BASE}/get-user-cart`, { headers });
        if (!mounted) return;
        const items = res.data?.data || res.data || [];
        computeTotalAndSet(items);
        setLoading(false);
        return;
      } catch (err2) {
        console.warn("[CART] Attempt 2 failed:", err2?.response?.status ?? err2.message);
      }

      // Attempt 3: POST with body
      try {
        console.log("[CART] Attempt 3: POST with body", { url: `${BASE}/get-user-cart`, body: { userId }, headers });
        const res = await axios.post(`${BASE}/get-user-cart`, { userId }, { headers });
        if (!mounted) return;
        const items = res.data?.data || res.data || [];
        computeTotalAndSet(items);
        setLoading(false);
        return;
      } catch (err3) {
        console.warn("[CART] Attempt 3 failed:", err3?.response?.status ?? err3.message);
        // all attempts failed — set safe empty cart so UI doesn't hang
        if (!mounted) return;
        console.error("All cart fetch attempts failed. Last error:", err3);
        setCart([]);
        setTotal(0);
        setLoading(false);
        return;
      }
    };

    fetchCart();

    return () => {
      mounted = false;
    };
    
  }, [auth?.token, auth?.user]); // re-run if auth changes

  // Delete item from cart — optimistic UI + multiple attempts
  const deleteItem = async (itemId) => {
    const { token, userId } = getAuthInfo();
    if (!token) {
      alert("Please log in to delete cart items.");
      navigate("/login");
      return;
    }
    const headers = buildHeaders(token, userId);

    const prev = cart ?? [];
    const updated = prev.filter((item) => item._id !== itemId && item.id !== itemId);
    computeTotalAndSet(updated);

    // Try 1
    try {
      console.log("[CART DELETE] Attempt 1: PUT delete-from-cart/:id", { url: `${BASE}/delete-from-cart/${itemId}`, headers });
      const res = await axios.put(`${BASE}/delete-from-cart/${itemId}`, {}, { headers });
      console.log("[CART DELETE] Success:", res.data);
      try { window.dispatchEvent(new CustomEvent("cart:item-deleted", { detail: { itemId } })); } catch {}
      return;
    } catch (err1) {
      console.warn("[CART DELETE] Attempt 1 failed:", err1?.response?.status ?? err1.message);
    }

    // Try 2
    try {
      console.log("[CART DELETE] Attempt 2: PUT delete-from-cart (body)", { url: `${BASE}/delete-from-cart`, body: { itemId, userId }, headers });
      const res2 = await axios.put(`${BASE}/delete-from-cart`, { itemId, userId }, { headers });
      console.log("[CART DELETE] Success:", res2.data);
      try { window.dispatchEvent(new CustomEvent("cart:item-deleted", { detail: { itemId } })); } catch {}
      return;
    } catch (err2) {
      console.warn("[CART DELETE] Attempt 2 failed:", err2?.response?.status ?? err2.message);
    }

    // Try 3
    try {
      console.log("[CART DELETE] Attempt 3: DELETE with data", { url: `${BASE}/delete-from-cart`, data: { itemId, userId }, headers });
      const res3 = await axios.delete(`${BASE}/delete-from-cart`, { headers, data: { itemId, userId } });
      console.log("[CART DELETE] Success:", res3.data);
      try { window.dispatchEvent(new CustomEvent("cart:item-deleted", { detail: { itemId } })); } catch {}
      return;
    } catch (err3) {
      console.error("All delete attempts failed. Rolling back UI and showing error.", err3);
      computeTotalAndSet(prev);
      alert(err3?.response?.data?.message ?? "Failed to delete item from cart. See console/network for details.");
    }
  };

  // Place order
  const placeOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    const { token, userId } = getAuthInfo();
    if (!token) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }
    const headers = buildHeaders(token, userId);

    try {
      console.log("[PLACE ORDER] url:", `${BASE}/place-order`, "body:", { order: cart }, "headers:", headers);
      const res = await axios.post(`${BASE}/place-order`, { order: cart }, { headers });
      alert(res?.data?.message ?? "Order placed successfully.");
      navigate("/profile/orderHistory");
      setCart([]);
      setTotal(0);
      try { window.dispatchEvent(new CustomEvent("cart:placed-order", { detail: { order: res.data } })); } catch {}
    } catch (err) {
      console.error("Order failed:", err, err?.response?.data);
      alert(err?.response?.data?.message ?? "Order failed. See console for details.");
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-900 px-12 h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-12 min-h-screen pb-12">
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
            <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">Your Cart</h1>

          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {cart.map((item, i) => {
              const idKey = item._id ?? item.id ?? item.bookId ?? `idx-${i}`;
              return (
                <div
                  className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                  key={idKey}
                >
                  <img
                    src={resolveImage(item.url)}
                    alt={item.title}
                    className="h-[20vh] md:h-[10vh] object-cover rounded-lg"
                  />
                  <div className="w-full md:w-auto px-4">
                    <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">{item.title}</h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">{item.desc?.slice(0, 100)}...</p>
                    <p className="text-normal text-zinc-300 mt-2 block md:hidden">{item.desc?.slice(0, 65)}...</p>
                  </div>
                  <div className="flex mt-4 w-full md:w-auto items-center justify-between md:gap-6">
                    <h2 className="text-zinc-100 text-3xl font-semibold flex">Rs. {item.price}</h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4"
                      onClick={() => deleteItem(idKey)}
                      title="Remove from cart"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">Total amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{cart.length} books</h2> <h2> Rs {total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                  onClick={placeOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

