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

UserBookingRouter.put("/bookings/:id/cancel", async (req, res) => {
  const { id } = req.params;
  const { status, cancellationReason ,cancelledBy } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status,
        cancellationReason,
        cancelledBy,
        cancelledAt: new Date(),
      },
      { new: true } // return updated document
    );

    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});


module.exports = UserBookingRouter;
