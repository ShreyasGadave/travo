const express = require("express");
const AddCars = express.Router();
const CarModel = require("../Model/Car");
const UploadCloudinary = require("../Model/CloudinaryStorage");

AddCars.post("/cars", UploadCloudinary.single("image"), async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      category,
      transmission,
      fuelType,
      fuelCapacity,
      seatingCapacity,
      location,
      description,
      color,
      mileage,
      engine,
      features, // should be sent as array or comma-separated string
      pickupAddress,
      pickupLat,
      pickupLng,
      registrationNumber,
      status, // optional, defaults to "Available"
    } = req.body;

    if (
      !brand ||
      !model ||
      !year ||
      !price ||
      !category ||
      !transmission ||
      !fuelType ||
      !fuelCapacity ||
      !seatingCapacity ||
      !location ||
      !description ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All required fields and a single image must be provided.",
      });
    }

    const imageURL = req.file.path;

    const newCar = new CarModel({
      brand,
      model,
      year: Number(year),
      price: Number(price),
      category,
      transmission,
      fuelType,
      fuelCapacity: Number(fuelCapacity),
      seatingCapacity: Number(seatingCapacity),
      location,
      description,
      images: [imageURL],
      color,
      mileage: mileage ? Number(mileage) : undefined,
      engine,
      features: features
        ? Array.isArray(features)
          ? features
          : features.split(",").map((f) => f.trim())
        : [],
      pickupLocation: {
        address: pickupAddress,
        lat: pickupLat ? Number(pickupLat) : undefined,
        lng: pickupLng ? Number(pickupLng) : undefined,
      },
      registrationNumber,
      status: status || "Available",
    });

    await newCar.save();

    res.status(201).json({
      message: "Car listed successfully!",
      car: newCar,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = AddCars;
