import { useState, useEffect } from "react";
import axios from "axios";
import { useAdmin } from "../Context/AdminContext";
import { FiEdit, FiSend, FiX } from "react-icons/fi";

const Profile = () => {
  const { admin } = useAdmin();
  const [isNewUser, setIsNewUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    alternatePhone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    region: "",
    pinCode: "",
    country: "India",
    idProofType: "",
    idProofNumber: "",
    idImg: "",
    profilePicture: "",
    role: "admin",
    status: "active",
    bio: "",
  });

useEffect(() => {
  const fetchProfile = async () => {
    console.log("this is the profile deta",admin);
    
    if (!admin?.adminId) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/profile/${admin.adminId}`
      );
      const profile = res.data;

      if (profile) {
        setFormData({
          name: profile.name ?? "",
          email: profile.email ?? "",
          contact: profile.contact ?? "",
          alternatePhone: profile.alternatePhone ?? "",
          gender: profile.gender ?? "",
          dob: profile.dob ? profile.dob.slice(0, 10) : "",
          address: profile.address ?? "",
          city: profile.city ?? "",
          state: profile.state ?? "",
          region: profile.region ?? "",
          pinCode: profile.pinCode ?? "",
          country: profile.country ?? "India",
          idProofType: profile.idProofType ?? "",
          idProofNumber: profile.idProofNumber ?? "",
          idImg: profile.idImg ?? "",
          profilePicture: profile.profilePicture ?? "",
          role: profile.role ?? "admin",
          status: profile.status ?? "active",
          bio: profile.bio ?? "",
        });

        setIsNewUser(false);
        setIsEditing(false); // Editing false for existing user
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setIsNewUser(true); // No profile found
        setIsEditing(true); // Enable editing for new user
      } else {
        console.error("Failed to load profile:", err);
      }
    }
  };

  fetchProfile();
}, [admin?.adminId]);

  const handleChange = async (e) => {
  const { name, value, files } = e.target;

  if ((name === "idImg" || name === "profilePicture") && files && files[0]) {
    const file = files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "travo_upload");
    data.append("cloud_name", "dtopjfdrv");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtopjfdrv/image/upload",
        data
      );

      const imageUrl = res.data.secure_url;
      console.log("✅ Uploaded:", name, imageUrl);

      setFormData((prev) => {
        const updated = { ...prev, [name]: imageUrl };
        const payload = { ...updated, adminId: admin?.adminId };

        axios
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/profile/${admin?.adminId}`,
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(() => console.log(`✅ ${name} saved to DB`))
          .catch((err) => console.error(`❌ Failed to save ${name}`, err));

        return updated;
      });
    } catch (err) {
      console.error(`❌ Upload failed for ${name}`, err);
    }
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!admin?.adminId) {
    alert("Admin ID not found. Please log in again.");
    return;
  }

  const payload = { ...formData, adminId: admin.adminId };

  try {
const res = await axios({
  method: isNewUser ? "post" : "put",
  url: isNewUser
    ? `${import.meta.env.VITE_BACKEND_URL}/profile`
    : `${import.meta.env.VITE_BACKEND_URL}/profile/${admin.adminId}`,
  data: payload,
  headers: {
    "Content-Type": "application/json",
  },
});


    alert("Profile saved successfully!");
    setIsEditing(false);
    setIsNewUser(false);
    console.log("Saved profile:", res.data);
  } catch (error) {
    console.error("Failed to save profile:", error);
    alert("Error saving profile");
  }
};


  return (
    <> {isNewUser && (
  <div className="bg-yellow-100 text-yellow-800 p-3 text-center font-medium">
    Welcome! Please fill out your profile to continue.
  </div>
)}
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-300 relative backdrop-blur-lg">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-1 rounded-lg text-white transition 
      ${
        isEditing
          ? "bg-white/20 text-white/70 cursor-not-allowed"
          : "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 shadow-md"
      }`}
          >
            <FiEdit className="text-lg" />
            Edit
          </button>
        </div>
        <div className="px-3 pb-6 -mt-12  z-10">
          <div className="flex items-center relative">
            <div className="">
              {/* Show image preview if available */}
              {formData.profilePicture &&
                typeof formData.profilePicture === "string" && (
                  <div className="relative w-fit mb-2">
                    <img
                      src={
                        formData.profilePicture ||
                        "data:image/png;base64,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"
                      }
                      alt="avatar"
                      className="w-34 h-34 rounded-full border-4 border-white shadow-md object-cover"
                    />
                 
                    {uploading && (
                      <p className="text-sm text-blue-500 font-medium">
                        Uploading image...
                      </p>
                    )}
                  </div>
                )}
              {isEditing && (
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  readOnly={!isEditing}
                  onChange={isEditing ? handleChange : undefined}
                  className="input-style cursor-pointer"
                />
              )}
            </div>
            <div>
            <input
              type="text"
              name="name"
              value={formData.name ?? ""}
              onChange={handleChange}
              readOnly={!isEditing}
              className="  text-black absolute top-0 text-2xl md:text-3xl font-bold focus:outline-none focus:ring-0"
              placeholder="Enter Your Name"
              required
            />  </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contact Info */}

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                placeholder="Enter your email"
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Phone:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                placeholder="Primary contact number"
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Alternate Phone:</label>
              <input
                type="text"
                name="alternatePhone"
                required
                value={formData.alternatePhone ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                placeholder="Alternate number"
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            {/* Address Info */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Address:</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                placeholder="Street Address"
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">City:</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">State:</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">District/Region:</label>
              <input
                type="text"
                name="region"
                required
                value={formData.region ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Pin Code:</label>
              <input
                type="text"
                name="pinCode"
                required
                value={formData.pinCode ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            {/* Identity Details */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Gender:</label>
              <select
                name="gender"
                required
                value={formData.gender ?? ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Date of Birth:</label>
              <input
                type="date"
                required
                name="dob"
                value={formData.dob ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">ID Proof Type:</label>
              <select
                name="idProofType"
                value={formData.idProofType ?? ""}
                onChange={handleChange}
                required
                disabled={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
              >
                <option value="">Select</option>
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">ID Proof Number:</label>
              <input
                type="text"
                name="idProofNumber"
                value={formData.idProofNumber ?? ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className="input-style border border-gray-200 bg-gray-100 rounded p-2 "
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500">Upload ID Proof:</label>

              {/* Show image preview if available */}
              {formData.idImg && typeof formData.idImg === "string" && (
                <div className="relative w-fit mb-2">
                  <img
                    src={formData.idImg}
                    alt="Uploaded ID"
                    className="h-32 w-auto rounded border border-gray-300 shadow-md"
                  />
                  <span className="absolute top-1 right-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Preview
                  </span>{" "}
                  {uploading && (
                    <p className="text-sm text-blue-500 font-medium">
                      Uploading image...
                    </p>
                  )}
                </div>
              )}
              {isEditing && (
                <input
                  type="file"
                  name="idImg"
                  accept="image/*"
                  readOnly={!isEditing}
                  onChange={isEditing ? handleChange : undefined}
                  className="input-style cursor-pointer"
                />
              )}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-gray-500">Short Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange ?? ""}
                readOnly={!isEditing}
                rows="3"
                className="input-style resize-none"
                placeholder="Tell us something about yourself..."
              ></textarea>
            </div>
          </div>
          {isEditing && (
            <div className="px-6 pb-6 flex gap-4">
              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-gray-700 bg-blue-600/50 hover:bg-green-300 backdrop-blur-md border border-white/30 shadow-md transition"
              >
                <FiSend className="text-lg" />
                Submit
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-red-300 border border-gray-300 shadow transition"
              >
                <FiX className="text-lg" />
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>  </>
  );
};

export default Profile;
