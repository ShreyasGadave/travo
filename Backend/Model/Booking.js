const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    userId: {
      type: String, // Can be Firebase UID or ObjectId depending on your auth
      required: true,
    },
    pickUp: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
    dropOff: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Online", "Offline", "UPI", "Card", "Cash"],
      default: "Offline",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
