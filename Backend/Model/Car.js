const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      ref: "User",
      required: true,
    },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    fuelCapacity: { type: Number, required: true },
    seatingCapacity: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },

    // 🔵 Main car image URLs
    images: {
      type: [String],
      required: true,
      validate: [(val) => val.length <= 3, "Maximum of 3 images allowed"],
    },

    // 🆕 Optional Additions:
    mobile: { type: Number },
    mileage: { type: Number }, // kmpl
    owner: { type: String }, // e.g., "1498cc", "2.0L"
    features: { type: [String] }, // e.g., ['ABS', 'Sunroof', 'Bluetooth']

    pickupLocation: {
      address: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },

    registrationNumber: { type: String },

    status: {
      type: String,
      enum: ["Available", "Rented", "Unavailable"],
      default: "Available",
    },

    rating: { type: Number, default: 0 },
    reviews: [
      {
        userId: String,
        comment: String,
        stars: Number,
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const CarModel = mongoose.model("Car", CarSchema);
module.exports = CarModel;
