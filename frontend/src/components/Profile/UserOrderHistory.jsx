import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader"; // Ensure Loader exists

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Track loading
  const [error, setError] = useState(null); // ✅ Track errors

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Show loader while fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100%]">
        <Loader />
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // Show "No Order History"
  if (orderHistory.length === 0) {
    return (
      <div className="h-[80vh] p-4 text-zinc-100">
        <div className="h-[100%] flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No Order History
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt=""
            className="h-[20vh] mb-8"
          />
        </div>
      </div>
    );
  }

  // Show orders (you can customize how to display them)
  return (
    <div className="p-4">
      {orderHistory.map((order, index) => (
        <div key={index} className="p-4 bg-zinc-800 text-white rounded mb-4">
          <p>Order ID: {order._id}</p>
          {order.book && <p>Book: {order.book.title}</p>}
        </div>
      ))}
    </div>
  );
};

export default UserOrderHistory;

