import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
<<<<<<< HEAD
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
=======
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";     
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20

function App() {
  const role = useSelector((state) => state.auth.role);

  return (
<<<<<<< HEAD
    <div className="bg-zinc-800 min-h-screen text-white">
=======
    <div className="min-h-screen bg-zinc-900 text-white">
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
<<<<<<< HEAD
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="*" element={<div className="text-red-500 p-4">❌ Route Not Matched</div>} />

        {/* ✅ Profile with role-based nested routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={role === "admin" ? <AllOrders /> : <Favourites />} />
          {role === "admin" ? (
            <Route path="add-book" element={<AddBook />} />
          ) : (
            <Route path="orderHistory" element={<UserOrderHistory />} />
          )}
          <Route path="settings" element={<Settings />} />
        </Route>
=======
        <Route path ="view-book-details/:id" />
        <Route path="/cart" element={<Cart />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
>>>>>>> e2a3af2f07961084d45a4f1f1790282e82af9d20
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
