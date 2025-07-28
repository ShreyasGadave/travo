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
        <form onSubmit={handleSubmit}>
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-300 relative backdrop-blur-lg">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
            className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-1 rounded-lg text-black transition 
      ${
        isEditing
          ? "bg-white/20 text-black/70 cursor-not-allowed"
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
        src={formData.profilePicture}
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
    onChange={handleChange}
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
