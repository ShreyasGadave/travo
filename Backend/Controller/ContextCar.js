const express = require("express");
const CarModel = require("../Model/Car");
const ContextRouter = express.Router();

// ✅ GET all admins
ContextRouter.get("/context-car", async (req, res) => {
  try {
    const cars = await CarModel.find().select("-__v");
    res.status(200).json(cars); // Use 200 for successful GET
  } catch (error) {
    console.error("Error fetching data:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = ContextRouter; 