// src/pages/UploadVideos.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UploadVideos = () => {
  const { subject } = useParams();  // Get subject from URL params
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("subject", subject);

    console.log("Uploading file:", videoFile);  // Log the file

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      alert(`${subject} video uploaded successfully!`);
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check the console for errors.");
    }
  };

  return (
    <div>
      <h2>Upload Video for {subject}</h2>

      {/* Video File Input */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{
          display: "block",  // Ensures the input is block level and visible
          marginBottom: "10px",
        }}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default UploadVideos;
