import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
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
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load admin and cars once on app load
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      fetchCars(parsedAdmin.adminId);
    } else {
      setAdmin(null);
      setLoading(false);
    }
  },[] );

  return (
    <AdminContext.Provider value={{ admin, cars, loading, fetchCars, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
