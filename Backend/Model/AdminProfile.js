// models/AdminProfile.js

const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    alternatePhone: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dob: {
      type: Date,
    },

    // Address Details
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    region: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    country: {
      type: String,
      default: "India",
    },

    // Identity & Verification
    idProofType: {
      type: String,
      enum: ["Aadhaar", "PAN", "Passport", "Driving License"],
    },
    idProofNumber: {
      type: String,
    },
    idImg: {
      type: String, // Cloudinary image URL or filename
    },

    // Profile & Role
    profilePicture: {
      type: String, // Cloudinary image URL or filename
    },
    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["active", "pending", "suspended"],
      default: "active",
    },

    // Other
    bio: {
      type: String,
    },

    // Admin Identifier
    adminId: {
      type: String,
      required: true,
      ref: "Admin", // Assuming there is an Admin collection
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminProfile", AdminProfileSchema);
