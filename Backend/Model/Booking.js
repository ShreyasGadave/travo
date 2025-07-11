import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    pickUp: {
      date: { type: Date, required: true },
      time: { type: String, required: true }, // Store as formatted string like "10:30 AM"
    },
    dropOff: {
      date: { type: Date, required: true },
      time: { type: String, required: true }, // Store as formatted string like "6:00 PM"
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

export default mongoose.model("Booking", bookingSchema);
