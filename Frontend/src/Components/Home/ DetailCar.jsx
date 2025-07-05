import Navbar from "./Navbar";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CarContext } from "../Context/CarContext.jsx";
import Footer from "./Footer";
import BG from "../../assets/JBG.jpg";

const DetailCar = () => {
  const { id } = useParams();
  const { cars, loading } = useContext(CarContext);

  const car = cars.find((car) => car._id === id);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!car) return <p className="text-center mt-6">Car not found.</p>;

  return (
    <>
      <Navbar />

     
      <Footer />
    </>
  );
};

export default DetailCar;
