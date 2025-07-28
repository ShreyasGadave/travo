import React, { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";
import { toast } from "react-toastify";

const Login = ({ setshowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { admin } = useAdmin();

  // 🚀 Redirect if already logged in
  useEffect(() => {
    if (admin?.adminId) {
      setshowLogin(false);
      navigate("/dashboard");
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful");
        setshowLogin(false);
        navigate("/admin");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup successful");
        setshowLogin(false);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    // 🛑 Outer click closes the modal
    <div
      onClick={() => setshowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-[10000] min-h-screen flex items-center justify-center bg-black/70 px-4"
    >
      {/* 🛑 Stop propagation to avoid modal auto-close on inner click */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
