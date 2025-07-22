import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);         // ✅ Login info
  const [adminProfile, setAdminProfile] = useState(null); // ✅ Profile info
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async (adminId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin-cars/${adminId}`
      );
      setCars(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch car data:", error);
    }
  };

  const fetchAdminProfile = async (adminId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/profile/${adminId}`
      );
      setAdminProfile(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch admin profile:", error);
    }
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);

      // Fetch related data
      fetchCars(parsedAdmin.adminId);
      fetchAdminProfile(parsedAdmin.adminId);
    } else {
      setAdmin(null);
    }

    setLoading(false);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,             // Login/session data
        adminProfile,      // Personal/profile data
        cars,
        loading,
        fetchCars,
        fetchAdminProfile,
        setAdmin,
        setAdminProfile
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
