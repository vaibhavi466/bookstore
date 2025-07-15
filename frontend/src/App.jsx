import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ViewBookDetails from "./pages/ViewBookDetails";
import Profile from "./pages/Profile";
import Favourites from "./components/Profile/Favourites"; // ✅ nestedimport OrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import UserOrderHistory from "./components/Profile/UserOrderHistory";

function App() {
   console.log("✅ App component rendered");
  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="*" element={<div className="text-red-500 p-4">❌ Route Not Matched</div>} />


        {/* ✅ Profile with nested routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} /> {/* default */}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
