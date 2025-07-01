import React from "react";
import { FaPlusSquare, FaThLarge, FaCar, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const menu = [
  { label: "Dashboard", icon: <FaThLarge />, path: "/admin", exact: true },
  { label: "Add car", icon: <FaPlusSquare />, path: "/admin/add-car" },
  { label: "Manage Cars", icon: <FaCar />, path: "/admin/manages-cars" },
  { label: "Manage Bookings", icon: <FaClipboardList />, path: "/admin/manage-bookings" },
];

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-sm py-6">
      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Animate the indicator using motion */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator" // 🔁 Shared layout ID for smooth animation
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full"
                      />
                    )}
                  </AnimatePresence>

                  <span className="text-lg">{item.icon}</span>
                 <span className=" hidden sm:block"> {item.label}</span> 
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
