const express = require("express");
const AddCars = express.Router();
const CarModel = require("../Model/Car");
const UploadCloudinary = require("../Model/CloudinaryStorage");

AddCars.post("/cars", UploadCloudinary.single("image"), async (req, res) => {
  try {
    const {
      ownerId,
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
      mobile,
      mileage,
      owner,
      features,            // comma-separated string or array
      pickupAddress,
      pickupLat,
      pickupLng,
      registrationNumber,
      status,              // optional
      tags,                // new
      insuranceProvider,   // new
      policyNumber,        // new
      validTill,           // new (date)
      lastServicedOn,      // new (date)
      needsService         // new (boolean)
    } = req.body;

    // Basic validation
    if (
      !ownerId ||
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
        message: "All required fields and an image must be provided.",
      });
    }

    const imageURL = req.file.path;

    const newCar = new CarModel({
      ownerId,
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
      mobile,
      mileage: mileage ? Number(mileage) : undefined,
      owner,
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
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : tags.split(",").map((t) => t.trim())
        : [],
      insurance: {
        provider: insuranceProvider || "",
        policyNumber: policyNumber || "",
        validTill: validTill || null,
      },
      maintenance: {
        lastServicedOn: lastServicedOn || null,
        needsService: needsService === "true" || needsService === true,
      },
    });

    await newCar.save();

    res.status(201).json({
      message: "Car listed successfully!",
      car: newCar,
    });
  } catch (error) {
    console.error("❌ Error creating car:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


module.exports = AddCars;
