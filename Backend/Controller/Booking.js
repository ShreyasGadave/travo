const express = require("express");
const BookingRouter = express.Router();
const { default: Booking } = require("../Model/Booking");

// POST /api/booking
BookingRouter.post("/booking", async (req, res) => {
  try {
    const {   ownerId, carId, pickUp, dropOff } = req.body;

    // ✅ Validate required booking fields
    if (
      !ownerId ||
      !carId ||
      !pickUp ||
      !pickUp.date ||
      !pickUp.time ||
      !dropOff ||
      !dropOff.date ||
      !dropOff.time
    ) {
      return res.status(400).json({
        message: "All booking fields (carId, pickup & dropoff with date and time) are required.",
      });
    }

    // ✅ Save booking
    const newBooking = new Booking ({
      ownerId,
      carId,
      pickUp,
      dropOff,
      bookedAt: new Date(), // Optional: add timestamp
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

BookingRouter.get("/booking/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const cars = await Booking.find({ ownerId: adminId });
    res.status(200).json(cars);
  } catch (error) {
    console.error("❌ Error fetching car data:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


module.exports = BookingRouter;
