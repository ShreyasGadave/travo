const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../Config/Cloudinary");

// ✅ Fix: Pass `cloudinary` directly
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: async (req, file) => {
    const originalExtension = file.originalname.split(".").pop();
    return {
      folder: "uploads",
      format: originalExtension, 
      public_id: `${Date.now()}-${uuidv4()}`,
      resource_type: "image",
    };
  },
});

const UploadCloudinary = multer({ storage });

module.exports = UploadCloudinary;