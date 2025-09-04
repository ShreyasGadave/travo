const express = require("express");
const UserBookingRouter = express.Router();
const Booking  = require("../Model/Booking");


UserBookingRouter.get("/booking-data/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const cars = await Booking.find({ userId: adminId });
    res.status(200).json(cars);
  } catch (error) {
    console.error("❌ Error fetching car data:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = UserBookingRouter;
