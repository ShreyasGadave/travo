const express = require("express");
const AdminRouter = express.Router();
const AdminModel = require("../Models/Profile");
const UploadCloudinary = require("../Models/CloudinaryStorage");

// 🔍 Helper to build admin object
const buildAdminData = (body, file) => ({
  Image: file?.path || file?.url || "No image uploaded",
  Name: body.Name,
  Email: body.Email,
  Phone: body.Phone,
  Address: body.Address,
  Bod: body.Bod,
});

// ✅ GET all admins
AdminRouter.get("/profile", async (req, res) => {
  try {
    const admins = await AdminModel.find().select("-__v");
    res.status(200).json(admins); // Use 200 for successful GET
  } catch (error) {
    console.error("Error fetching data:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ POST create new admin
AdminRouter.post("/profile", UploadCloudinary.single("image"), async (req, res) => {
  try {
    const newAdmin = await AdminModel.create(buildAdminData(req.body, req.file));
    res.status(201).json({ message: "Admin created successfully!", adminData: newAdmin }); // Use 201 for successful creation
  } catch (error) {
    console.error("Error creating admin:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ GET single admin by ID
AdminRouter.get("/profile/:id", async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id).select("-__v");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" }); // Use 404 for not found
    }
    res.status(200).json(admin); // Use 200 for successful GET
  } catch (error) {
    console.error("Error fetching admin:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ PUT update admin with optional image
AdminRouter.put("/profile/:id", UploadCloudinary.single("image"), async (req, res) => {
  try {
    const updatedData = buildAdminData(req.body, req.file);

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" }); // Use 404 for not found
    }

    res.status(200).json({ message: "Admin updated!", adminData: updatedAdmin }); // Use 200 for successful update
  } catch (error) {
    console.error("Error updating admin:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ✅ DELETE admin
AdminRouter.delete("/profile/:id", async (req, res) => {
  try {
    const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" }); // Use 404 for not found
    }
    res.status(200).json({ message: "Admin deleted successfully!" }); // Use 200 for successful deletion
  } catch (error) {
    console.error("Error deleting admin:", error); // Log the error
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = AdminRouter;