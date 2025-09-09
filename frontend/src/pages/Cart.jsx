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


import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null); // default null (loading state)
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        const cartItems = res.data.data || [];
        setCart(cartItems);
        setTotal(cartItems.reduce((sum, item) => sum + (item.price || 0), 0));
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]);
      }
    };
    fetchCart();
  }, []);

  // Delete item from cart
  const deleteItem = async (itemId) => {
    try {
      await axios.put(`http://localhost:1000/api/v1/delete-from-cart/${itemId}`, {}, { headers });

      // Update frontend state
      const updatedCart = cart.filter((item) => item._id !== itemId);
      setCart(updatedCart);
      setTotal(updatedCart.reduce((sum, item) => sum + (item.price || 0), 0));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // Place order
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen">
      {!cart && <Loader />}

      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">
            Your Cart
          </h1>

          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {cart.map((item, i) => (
              <div
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                key={i}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-[20vh] md:h-[10vh] object-cover rounded-lg"
                />
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                    {item.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {item.desc?.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                    {item.desc?.slice(0, 65)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-3xl font-semibold flex">
                    Rs. {item.price}
                  </h2>
                  <button
                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                    onClick={() => deleteItem(item._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart total + Place order */}
          <div className="mt-4 w-full flex items-center justify-end">
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


