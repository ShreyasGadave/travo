import { FaPlusSquare, FaThLarge, FaCar, FaClipboardList } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaListAlt } from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: < MdSpaceDashboard  />, path: "/admin", exact: true },
  { label: "Add car", icon: <FaPlusSquare />, path: "/admin/add-car" },
  { label: "Manage Cars", icon: <FaCar />, path: "/admin/manages-cars" },
  { label: "Manage Bookings", icon: <FaClipboardList />, path: "/admin/manage-bookings" },
   { label: "Cars List", icon:  < FaListAlt />, path: "/admin/cars-list" },
];

const Sidebar = () => {
  return (
    <>
<div className="w-12 hidden md:block h-screen sm:w-50 flex-shrink-0 bg-white shadow-sm sm:py-10 pt-6 sticky top-[5px] overflow-y-auto">
      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-2  text-sm font-medium ${
                  isActive ? "text-blue-600 border-indigo-500 border-t border-b bg-blue-50" : "text-gray-700"
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

                  <span className="text-xl">{item.icon}</span>
                 <span className=" hidden sm:block"> {item.label}</span> 
                </>
              )}
            </NavLink>
            
          </li>
          
        ))}
      </ul>
    </div> 
<div className="md:hidden sticky top-0 border-t border-gray-200 bg-gray-100 shadow-sm z-50">
  <ul className="flex items-center justify-around py-3">
    {menu.map((item, index) => (
      <li key={index}>
        <NavLink
          to={item.path}
          end={item.exact}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-blue-600" : "text-gray-700"
            }`
          }
        >
          <span className="text-xl">{item.icon}</span>
        </NavLink>
      </li>
    ))}
  </ul>
</div>



    </>
  );
};

export default Sidebar;
