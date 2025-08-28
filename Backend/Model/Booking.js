const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    bookingCode: { type: String, unique: true },

    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carDetails: {
      brand: String,
      model: String,
      registrationNumber: String,
    },

    ownerId: { type: String, required: true },
    userId: { type: String, required: true },

    pickUp: {
      date: { type: Date, required: true },
      time: { type: Date, required: true },
      location: {
        address: String,
        lat: Number,
        lng: Number,
      },
    },
    dropOff: {
      date: { type: Date, required: true },
      time: { type: Date, required: true },
      location: {
        address: String,
        lat: Number,
        lng: Number,
      },
    },

    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

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
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    transactionId: { type: String },
    amountPaid: { type: Number, default: 0 },

    licenseNumber: { type: String },
    idProof: { type: String },

    notes: { type: String },
    adminNotes: { type: String },
    cancellationReason: { type: String },

    confirmedAt: { type: Date },
    cancelledAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);