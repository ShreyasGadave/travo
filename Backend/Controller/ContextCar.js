const express = require("express");
const CarModel = require("../Model/Car");
const ContextRouter = express.Router();

// ✅ GET all cars
ContextRouter.get("/context-car", async (req, res) => {
  try {
    const cars = await CarModel.find().select("-__v"); // Exclude internal MongoDB version key
    res.status(200).json(cars); // 200 = OK
  } catch (error) {
    console.error("❌ Error fetching car data:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = ContextRouter;
