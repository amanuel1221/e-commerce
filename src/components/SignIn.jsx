// src/pages/Signin.jsx

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Login successful!");
      setEmail("");
      setPassword("");
      navigate("/dashboard"); // or change to "/" for homepage
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("This email is not registered. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Sorry, email or password is incorrect.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        aria-labelledby="signin-heading"
      >
        <h2 id="signin-heading" className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && <div role="alert" className="text-red-600 mb-3">{error}</div>}

        <div className="mb-3">
          <label htmlFor="signin-email" className="block mb-1 font-semibold">Email Address</label>
          <input
            id="signin-email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="signin-password" className="block mb-1 font-semibold">Password</label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 underline">
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signin;
