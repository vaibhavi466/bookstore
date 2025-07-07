import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path ="view-book-details/:id" />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
