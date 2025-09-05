import travo from "../../assets/travo.svg";
import React, { useContext, useState } from "react";
import { CiSearch, CiSettings } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import profilePic from "../../assets/Profil.png";
import { RiAdminFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

import { motion, AnimatePresence } from "framer-motion";
import { AdminContext } from "../Context/AdminContext";

const Navbar = ({ setshowLogin }) => {

  const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    // Optional: redirect or update UI
   navigate("/") 
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

const UserData=useContext(AdminContext);
const profile = UserData?.adminProfile?.profilePicture;


  const [showDropdown, setShowDropdown] = useState(false); // ⬅ Dropdown toggle
  const navigate = useNavigate();
  return (
    <div className=" lg:px-8 lg:py-5 px-5 py-4 bg-white shadow">
      <div className="flex justify-between items-center">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={travo}
              alt="travo"
              className="h-5 sm:h-6 cursor-pointer"
            />
          </Link>
          <div className=" items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm hidden sm:flex">
            <CiSearch size={20} className="text-gray-500 hover:scale-105" />
            <input
              type="text"
              placeholder="Search something here"
              className="outline-none px-3 text-sm w-64"
            />
            <LuSettings2 size={20} className="text-gray-500  hover:scale-105" />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <div className="rounded-full border-[0.5px] border-gray-300 p-2 hover:bg-gray-100 hidden sm:block">
            <IoHeart className="text-gray-700 hover:scale-105 " size={16} />
          </div>
          <div className="relative rounded-full  border-[0.5px]  border-gray-300 p-2 hover:bg-gray-100 hidden sm:block">
            <FaBell className="text-gray-700  hover:scale-105 " size={16} />
          </div>
          {/* <NavLink
            to="/login"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          > */}
          <div
            onClick={() => {
              setshowLogin(true);
            }}
            className="rounded-full  border-[0.5px] border-gray-300 p-2 hover:bg-gray-100 hidden sm:block"
          >
            <RiAdminFill
              className="text-gray-700  hover:scale-105 "
              size={20}
            />
          </div>
          {/* </NavLink> */}
<div className="relative inline-block group">
  {/* Profile Image (Trigger) */}
  <img
    src={profile}
    alt="user"
    className="w-8 h-8 rounded-full object-cover shadow cursor-pointer"
  />

  {/* Dropdown Menu (must be sibling of image inside group) */}

  <div className=" ">
      <div className="absolute top-9 -right-1 z-10 bg-black/10 shadow rounded-2xl px-2 py-1 hidden  group-hover:block min-w-[160px]">
   <button
      onClick={() => navigate('/profile')}
      className="block w-full text-left px-2 py-2 hover:bg-green-300 rounded-2xl"
    >
      My Profile
    </button>
   <button
  onClick={handleSignOut}
  className="block w-full text-left px-2 py-2 hover:bg-red-600/40 rounded-2xl"
>
  Sign out
</button>

  </div>  </div>
</div>



        </div>
      </div>
      <div className="flex justify-between items-center gap-1 mt-4 sm:hidden">
        {/* Search Input Box (full width) */}
        <div className="flex-1 flex items-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-sm">
          <CiSearch size={20} className="text-gray-500 hover:scale-105" />
          <input
            type="text"
            placeholder="Search something here"
            className="outline-none px-3 text-sm text-gray-700 w-full"
          />
        </div>
        <div
          className="flex items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-sm hover:bg-gray-100 cursor-pointer"
          onClick={() => setShowDropdown((prev) => !prev)} // ⬅ Toggle dropdown
        >
          <LuSettings2 size={20} className="text-gray-500 hover:scale-105" />
        </div>
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-29 z-50 rounded-xl sm:hidden "
            >
              <div className="flex flex-col gap-4 items-start">
                <div className="flex w-full items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-2xl hover:bg-gray-100 cursor-pointer">
                  <IoHeart
                    className="text-gray-500 hover:scale-105"
                    size={20}
                  />
                </div>
                <div className="flex w-full items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-2xl hover:bg-gray-100 cursor-pointer">
                  <FaBell className="text-gray-500 hover:scale-105" size={20} />
                </div>
                <NavLink
                  to="/admin"
                  className="w-full"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <div className="flex w-full items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-2xl hover:bg-gray-100 cursor-pointer">
                    <RiAdminFill
                      className="text-gray-500 hover:scale-105"
                      size={20}
                    />
                  </div>
                </NavLink>
                <div className="flex w-full items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-2xl hover:bg-gray-100 cursor-pointer">
                  <img
                    src={profilePic}
                    alt="user"
                    className="w-6 h-6 rounded-full object-cover border"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
