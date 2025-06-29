import travo from "../assets/travo.svg";
import { CiSearch, CiSettings } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import profilePic from "../assets/profil.png";

const Navbar = () => {
  return (
    <div className=" lg:px-8 lg:py-5 px-5 py-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-10">
          <img src={travo} alt="travo" className="h-5 lg:h-6" />
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
          <div className="rounded-full  border-[0.5px] border-gray-300 p-2 hover:bg-gray-100 hidden sm:block">
            <IoMdSettings
              className="text-gray-700  hover:scale-105 "
              size={20}
            />
          </div>
          <img
            src={profilePic}
            alt="user"
            className="w-8 h-8 rounded-full object-cover border"
          />
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

  {/* Settings Icon Box */}
  <div className="flex items-center justify-center border border-gray-200 rounded-2xl px-4 py-2 bg-white shadow-sm hover:bg-gray-100 cursor-pointer">
    <LuSettings2 size={20} className="text-gray-500 hover:scale-105" />
  </div>
</div>

    </div>
  );
};

export default Navbar;
