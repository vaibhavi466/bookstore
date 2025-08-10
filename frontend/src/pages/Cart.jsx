import React, { useState, useEffect } from 'react';
import Loader from '../components/common/Loader';

const Cart = () => {
  const backendReady = false; // 🔁 Set to true when backend is ready
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!backendReady) {
        // 🧪 Mock data
        const mockItems = [
          { id: 1, title: "Mock Book 1", desc: "Mock Description 1", price: 499, url: "/book1.png" },
          { id: 2, title: "Mock Book 2", desc: "Mock Description 2", price: 299, url: "/book2.png" },
        ];
        setCart(mockItems);
        setTotal(mockItems.reduce((sum, item) => sum + item.price, 0));
        return;
      }

      try {
        const res = await axios.get('http://localhost:1000/api/v1/get-user-cart', { headers });
        setCart(res.data.items || []);
        setTotal(res.data.items.reduce((sum, item) => sum + (item.price || 0), 0));
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  const handleDeleteItem = async (itemId) => {
    if (!backendReady) {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      setTotal(updatedCart.reduce((sum, item) => sum + item.price, 0));
      return;
    }

    try {
      await axios.delete(`/api/cart/${itemId}`);
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      setTotal(updatedCart.reduce((sum, item) => sum + item.price, 0));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handlePurchase = async () => {
    if (!backendReady) {
      alert('Purchase successful (Mock)');
      setCart([]);
      setTotal(0);
      return;
    }

    try {
      await axios.post('/api/cart/checkout');
      setCart([]);
      setTotal(0);
      alert('Purchase successful!');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (cart === null) return <Loader />;

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
          Your Cart is Empty
        </h1>
        <img
          src="/emptyCart.png"
          alt="Empty Cart"
          className="lg:w-[50%] w-[80%] mx-auto mt-10"
        />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-12 h-screen">
      {!Cart && <Loader />}
      {Cart && Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img
              src="/empty-cart.png"
              alt="empty cart"
              className='lg:h-[50vh]'
            />
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">
            Your Cart 
          </h1>
          {Cart.map((items,i) => (
            <div key={i} className="bg-zinc-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 shadow-md"
            >
              <img
                src={items.url}
                alt={items.title}
                className="h-[20vh] md:h-[15vh] object-cover rounded-lg"
              />
              <div className="w-full md:w-auto">
                <h2 className="text-2xl font-semibold text-zinc-100 text-start mt-2 md:mt-0">
                  {items.title}
                </h2>
                <p className="text-zinc-300 mt-2 hidden lg:block">
                  {items.desc?.slice(0, 65)}...
                </p>
                <p className="text-zinc-100 mt-2 font-semibold">₹ {items.price}</p>
          ))}




        </>
      )}






      <h1 className="text-4xl font-bold text-zinc-300 text-center mb-8">
        Your Cart
      </h1>

      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {cart.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 shadow-md"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-[20vh] md:h-[15vh] object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-zinc-100">
                {item.title}
              </h2>
              <p className="text-zinc-400 mt-1 hidden md:block">
                {item.desc?.slice(0, 65)}...
              </p>
              <p className="text-zinc-100 mt-2 font-semibold">₹ {item.price}</p>
            </div>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-2 md:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-10 text-right">
        <h2 className="text-3xl text-zinc-100 font-semibold">Total: ₹ {total}</h2>
        <button
          onClick={handlePurchase}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
