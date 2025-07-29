import React ,{useState} from "react";
import Loader from "../components/Loader/Loader";
const Cart=()=>{
  const [Cart,setCart]=useState(); //by defalut cart is empty
  return (
  <>
  {!Cart && <Loader/>} 
    {Cart && Cart.length===0 &&( 
      <div className="h-screen">
        <div className="h-[100%] flex items-center justify-center flex-col ">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400 ">
            Empty Cart
          </h1>
          <img
            src="/empty-cart.png"
            alt="empty cart"
            className="lg:h-[50vh]"
          />
        </div>
      </div>
    )}
    {Cart && Cart.length>0 && (
      <>
        <h1 className="text-5xl font-semibold text-zinc-500 mb-8 ">
          Your Cart
        </h1>
        {Cart.map((items,i)=>(
          <div
            className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            key={i}
          >
            <img
              src={items.url}
              alt="/"
              className="h-[20vh] md:h-[10vh] object-cover"
            />
            <div className="w-full md:w-auto">
              <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {items.title}
              </h1>
              <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                {items.desc.slice(0,100)}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:block">
                {items.desc.slice(0,65)}...
              </p>
              <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                {items.desc.slice(0,100)}...
              </p>
            </div>
            <div className="flex mt-4 w-full md:w-auto items-center justify-between">
              <h2 className="text-zinc-100 text-3xl font-semibold flex">
                 Rs. {items.price}
              </h2>
              <button
                className="bg-red-100 text-"

              >
                </>
              </button>
            </div>
          </div>

        ))}
      </>
    )}</>;
  



};

export default Cart;


