const express = require("express");
const BookingRouter = express.Router();
const Booking  = require("../Model/Booking");

// POST /api/booking
// POST /api/booking
BookingRouter.post("/booking", async (req, res) => {
  try {
    const { ownerId, userId, carId, pickUp, dropOff, totalPrice, totalDays, carDetails,notes ,adminID} = req.body;

    // ✅ Validate required booking fields
    if (
      !ownerId ||
      !userId ||
      !carId ||
      !pickUp ||
      !pickUp.date ||
      !carDetails ||
      !pickUp.time ||
      !dropOff ||
      !dropOff.date ||
      !dropOff.time ||
      !totalDays ||
      !totalPrice ||
      !notes ||
      !adminID
    ) {
      return res.status(400).json({
        message:
          "All booking fields (ownerId, userId, carId, pickup & dropoff with date and time, totalDays, totalPrice) are required.",
      });
    }

    // ✅ Generate booking code (like TRV-123456)
    const bookingCode = "TRV-" + Math.floor(100000 + Math.random() * 900000);

    // ✅ Save booking (pass full object)
    const newBooking = new Booking({
      bookingCode,
      ownerId,
      userId,
      carId,
      adminID,
      carDetails, // ✅ Save the car details snapshot
      pickUp,
      dropOff,
      totalDays,
      totalPrice,
      notes,
      bookedAt: new Date(),
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
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
