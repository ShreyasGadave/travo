const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    bookingCode: { type: String, unique: true },

    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },

    // full snapshot of car details at the time of booking
    carDetails: {
      brand: String,
      model: String,
      year: Number,
      price: Number,
      category: String,
      transmission: String,
      fuelType: String,
      fuelCapacity: Number,
      seatingCapacity: Number,
      location: String,
      description: String,
      mileage: Number,
      owner: String,
      images: [String],
      mobile: Number,
      registrationNumber: String,
      pickupLocation: {
        address: String,
        lat: Number,
        lng: Number,
      },
      status: String,
      tags: [String],
      features: [String],
      insurance: {
        provider: String,
        policyNumber: String,
        validTill: Date,
      },
      maintenance: {
        lastServicedOn: Date,
        needsService: Boolean,
      },
      rating: Number,
    },

    ownerId: { type: String, required: true },
    userId: { type: String, required: true },

    // snapshot of user details at the time of booking
    userDetails: {
      name: String,
      email: String,
      phone: String,
      role: { type: String, enum: ["User", "Vendor", "Admin"], default: "User" }
    },

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

    // security deposit (if applicable)
    securityDeposit: { type: Number, default: 0 },
    depositStatus: {
      type: String,
      enum: ["Pending", "Held", "Refunded"],
      default: "Pending",
    },

    licenseNumber: { type: String },
    idProof: { type: String },

    notes: { type: String },
    adminNotes: { type: String },
    cancellationReason: { type: String },

    confirmedAt: { type: Date },
    cancelledAt: { type: Date },
    cancelledBy: {
      type: String,
      enum: ["User", "Vendor", "Admin", null],
      default: null,
    },
    completedAt: { type: Date },

    // audit log of all actions on booking
    actions: [
      {
        action: String, // e.g. "Status Updated", "Payment Confirmed"
        by: String,     // userId, vendorId, or adminId
        at: { type: Date, default: Date.now },
      }
    ],

    // feedback system
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      review: String,
    },

    // driver details (optional if vendor provides driver)
    driverRequired: { type: Boolean, default: false },
    driverDetails: {
      name: String,
      licenseNumber: String,
      contact: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
