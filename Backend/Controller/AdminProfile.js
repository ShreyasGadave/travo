const express = require("express");
const multer = require("multer");
const router = express.Router();
const AdminProfile = require("../Model/AdminProfile");
const UploadCloudinary = require("../Model/CloudinaryStorage");

router.post(
  "/profile",
  UploadCloudinary.fields([
    { name: "idImg", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        adminId,
        name,
        email,
        contact,
        alternatePhone,
        gender,
        dob,
        address,
        city,
        state,
        region,
        pinCode,
        country,
        idProofType,
        idProofNumber,
        role,
        status,
        bio,
      } = req.body;

      if (!adminId) return res.status(400).json({ error: "adminId is required" });

      const idImg = req.files?.idImg?.[0]?.path || "";
      const profilePicture = req.files?.profilePicture?.[0]?.path || "";

      const existing = await AdminProfile.findOne({ adminId });

      const profileData = {
        adminId,
        name,
        email,
        contact,
        alternatePhone,
        gender,
        dob,
        address,
        city,
        state,
        region,
        pinCode,
        country,
        idProofType,
        idProofNumber,
        idImg,
        profilePicture,
        role,
        status,
        bio,
      };

      let saved;
      if (existing) {
        Object.assign(existing, profileData);
        saved = await existing.save();
      } else {
        saved = await AdminProfile.create(profileData);
      }

      res.status(200).json(saved);
    } catch (err) {
      console.error("Profile save failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/profile/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const profile = await AdminProfile.findOne({ adminId });

    if (!profile) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;

    const updated = await AdminProfile.findOneAndUpdate(
      { adminId },
      { $set: req.body },
      { new: true, upsert: true } // ✅ update if exists, insert if not
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Update error" });
  }
});


module.exports = router;
