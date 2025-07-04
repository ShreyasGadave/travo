const express = require("express");
const UploadCloudinary = require("../Model/CloudinaryStorage");
const CarModel = require("../Model/Car");
const ManageCar = express.Router();

// Utility: Build car object from form + files
const buildCarData = (body, files) => ({
  brand: body.brand,
  model: body.model,
  year: Number(body.year),
  price: Number(body.price),
  category: body.category,
  transmission: body.transmission,
  fuelType: body.fuelType,
  fuelCapacity: Number(body.fuelCapacity),
  seatingCapacity: Number(body.seatingCapacity),
  location: body.location,
  description: body.description,

  images: files?.map((file) => file.path || file.url) || [],

  mobile: body.mobile,
  mileage: body.mileage,
  owner: body.owner,
  features: body.features
    ? Array.isArray(body.features)
      ? body.features
      : body.features.split(",").map((f) => f.trim())
    : [],

pickupLocation: {
  address: body.pickupAddress,
  lat: isNaN(Number(body.pickupLat)) ? 0 : Number(body.pickupLat),
  lng: isNaN(Number(body.pickupLng)) ? 0 : Number(body.pickupLng),
},
  registrationNumber: body.registrationNumber,
  status: body.status || "Available",
  rating: Number(body.rating) || 0,
});

ManageCar.put(
  "/car/:id",
  UploadCloudinary.array("images", 3),
  async (req, res) => {
    try {
      // Get existing car
      const existingCar = await CarModel.findById(req.params.id);
      if (!existingCar) {
        return res.status(404).json({ message: "Car not found" });
      }

      // Build data
      const updatedData = buildCarData(req.body, req.files);

      // ✅ If no new images uploaded, preserve old ones
      if (!req.files || req.files.length === 0) {
        updatedData.images = existingCar.images;
      }

      const updatedCar = await CarModel.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
      ).select("-__v");

      res.status(200).json({
        message: "Car updated!",
        updatedCar,
      });
    } catch (error) {
      console.error("Error updating Car:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);


// ✅ DELETE: Delete Car
ManageCar.delete("/car/:id", async (req, res) => {
  try {
    const deletedCar = await CarModel.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully!" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = ManageCar;
