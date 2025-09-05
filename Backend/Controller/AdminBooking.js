const express = require("express");
const AdminBookingRouter = express.Router();
const Booking  = require("../Model/Booking");


AdminBookingRouter.get("/admins/:adminId/bookings", async (req, res) => {
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

AdminBookingRouter.put("/admins/:adminId/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const { status, cancellationReason, cancelledBy } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status,
        cancellationReason,
        cancelledBy,
        cancelledAt: new Date(),
      },
      { new: true }
    );

    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});



module.exports = AdminBookingRouter;
