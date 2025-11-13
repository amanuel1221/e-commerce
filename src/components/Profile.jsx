import React from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">You’re not logged in</h2>
          <p className="mb-4 text-gray-600">Please sign in to view your profile.</p>
          <button
            onClick={() => navigate("/signin")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
        <div className="text-left mb-6">
          <p className="mb-2">
            <strong>Full Name:</strong>{" "}
            <span className="text-gray-700">{user.displayName || "N/A"}</span>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <span className="text-gray-700">{user.email}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
