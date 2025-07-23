import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Adjust if needed

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const [adminProfile, setAdminProfile] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const newAdmin = {
          adminId: user.uid,
          email: user.email,
          name: user.displayName ?? "",
        };

        setAdmin(newAdmin);
        localStorage.setItem("admin", JSON.stringify(newAdmin));

        await Promise.all([
          fetchCars(user.uid),
          fetchAdminProfile(user.uid),
        ]);
      } else {
        setAdmin(null);
        setAdminProfile(null);
        localStorage.removeItem("admin");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // If localStorage admin was present, try fetching data without Firebase login event
  useEffect(() => {
    const local = localStorage.getItem("admin");
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed?.adminId) {
        fetchCars(parsed.adminId);
        fetchAdminProfile(parsed.adminId);
      }
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        adminProfile,
        cars,
        loading,
        fetchCars,
        fetchAdminProfile,
        setAdmin,
        setAdminProfile,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
