import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { emailApis, userApis } from "../services/apis";

const Settings = () => {
  const { getUserProfile } = useAppContext();

  const [newEmail, setNewEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAddEmail = async () => {
    try {
      const res = await axios.get(emailApis.ADD_NEW_EMAIL_ACCOUNT_API, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success && res.data.url) {
        window.open(res.data.url, "_blank");
        toast.success("Redirecting to Gmail for authentication...");
      } else {
        toast.error("Failed to initiate Gmail linking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding email.");
    }
  };

  const handleProfileImageUpload = async () => {
    if (!profileImage) return toast.error("Select an image first!");
    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      setUploading(true);
      const res = await axios.put(userApis.UPDATE_PROFILE_API, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        toast.success("Profile image updated!");
        getUserProfile();
        setProfileImage(null);
        setPreviewImage(null);
      }
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 bg-white rounded-lg shadow-md mt-10 mb-16">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Settings</h2>

      {/* Add New Email */}
      <div className="w-full">
        <label className="block font-medium text-gray-700 mb-2">Link an Email</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="example@email.com"
            className="flex-1 px-4 py-2 border rounded-md text-sm"
          />
          <button
            onClick={handleAddEmail}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition
            cursor-pointer"
          >
            Link
          </button>
        </div>
      </div>

      {/* Upload Profile Image */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Upload Profile Image</label>
        <label
          htmlFor="profile-upload"
          className="w-full h-36 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <svg
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-4m0 0V8m0 4H8m4 0h4m2 4a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h4a4 4 0 014 4"
            />
          </svg>
          <span className="text-gray-500 text-sm">Click to select an image</span>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfileImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
        </label>

        {previewImage && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <p className="text-sm text-gray-500 mt-1">Preview of selected image</p>
          </div>
        )}

        <button
          onClick={handleProfileImageUpload}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition 
          w-full font-medium cursor-pointer"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
