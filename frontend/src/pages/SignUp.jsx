import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        {
          username,
          email,
          password,
          address
        }
      );
      console.log(response.data);
      // ✅ Automatically log in user after successful signup
      const loginResponse = await axios.post(
        "http://localhost:1000/api/v1/login",
        {
          username,
          password,
        }
      );

    const { id, role, token } = loginResponse.data;
    // ✅ Store session info
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    localStorage.setItem('isLoggedIn', true); // 🟢 crucial!

    dispatch(authActions.login()); // ✅ set isLoggedIn to true
    dispatch(authActions.changeRole(role)); // ✅ set role in redux

    alert("Signup successful");
    navigate("/profile"); // Redirect to profile page after signup
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 mb-6 rounded bg-gray-700"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

