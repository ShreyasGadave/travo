
const mongoose = require("mongoose");
// const Float = require("mongoose-float");

// Float.loadType(mongoose);

const CarSchema = new mongoose.Schema(
  {
    // Ownership
    ownerId: {
      type: String,
      ref: "User",
      required: true,
    },

    // Basic Info
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true }, // Per day
    category: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    fuelCapacity: { type: Number, required: true },
    seatingCapacity: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    mileage: { type: Number }, // kmpl

    // Car condition
    owner: { type: String }, // e.g., "1498cc", "2.0L"

    // Media
    images: {
      type: [String],
      required: true,
      validate: [(val) => val.length <= 3, "Maximum of 3 images allowed"],
    },

    // Optional
    mobile: { type: Number },
    registrationNumber: { type: String },

    // Pickup location (with map coords)
    pickupLocation: {
      address: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },

    // Availability Calendar (Blocked Dates)
    availability: [
      {
        from: { type: Date },
        to: { type: Date },
      },
    ],

    // Booking status
    status: {
      type: String,
      enum: ["Available", "Rented", "Unavailable"],
      default: "Available",
    },

    // Tags (for filters/search)
    tags: {
      type: [String], // e.g., ['SUV', 'Luxury', 'Electric']
      default: [],
    },

    // Features
    features: {
      type: [String], // e.g., ['ABS', 'Bluetooth', 'Sunroof']
      default: [],
    },

    // Insurance
    insurance: {
      provider: { type: String },
      policyNumber: { type: String },
      validTill: { type: Date },
    },

    // Maintenance details
    maintenance: {
      lastServicedOn: { type: Date },
      needsService: { type: Boolean, default: false },
    },

    // Ratings & reviews
    rating: { type: Number, default: 0.0 },
    reviews: [
      {
        userId: String,
        comment: String,
        stars: Number,
      },
    ],

    // Internal use
    notes: { type: String },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const CarModel = mongoose.model("Car", CarSchema);
module.exports = CarModel;
