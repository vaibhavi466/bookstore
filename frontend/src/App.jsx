import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
=======
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

>>>>>>> d4e344c35cd5032f6b4b04424973718f13477e9a
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ViewBookDetails from "./pages/ViewBookDetails";
import Profile from "./pages/Profile";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";

function App() {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
<<<<<<< HEAD
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="*" element={<div className="text-red-500 p-4"> Route Not Matched</div>} />


        





        {/* ✅ Profile with role-based nested routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={role === "admin" ? <AllOrders /> : <Favourites />} />
          {role === "admin" ? (
            <Route path="add-book" element={<AddBook />} />
          ) : (
            <Route path="orderHistory" element={<UserOrderHistory />} />
          )}
=======
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Profile with nested routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} /> {/* default */}
          <Route path="orderHistory" element={<UserOrderHistory />} />
>>>>>>> d4e344c35cd5032f6b4b04424973718f13477e9a
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
