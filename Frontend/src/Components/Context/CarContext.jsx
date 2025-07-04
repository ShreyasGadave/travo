// src/context/CarContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCars = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/context-car`
      );
      setCars(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch car data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(); // fetch once when component mounts
  }, []);

  return (
    <CarContext.Provider
      value={{
        cars,
        loading,
        fetchCars,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
