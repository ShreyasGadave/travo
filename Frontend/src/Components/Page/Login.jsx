import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Navbar from "../Home/Navbar";
import { useNavigate } from "react-router-dom"; // ✅ import

const Login = ({setshowLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle login/signup
  const navigate = useNavigate(); // ✅ initialize

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      if (isLogin) {
        // Login user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert("Login successful");
              setshowLogin(false);  
        navigate("/admin");
      } else {
        // Signup user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log("Signed up:", userCredential.user);
        alert("Signup successful");
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div onClick={()=>{setshowLogin(false)}}>

      <div onClick={()=>{setshowLogin(true)}} className=" fixed top-0 bottom-0 left-0 right-0 z-10000  min-h-screen flex items-center justify-center bg-black/70 px-4">
        <div  onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
    </div>
  );
};

export default Login;
