import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/LogIn";     
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <div className="bg-zinc-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
