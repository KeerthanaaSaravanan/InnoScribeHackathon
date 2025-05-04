import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles.css";

const AddResources = () => {
  const { subject } = useParams();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e, type) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      type,
      file,
    }));

    setUploading(true);
    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setProgress(progressVal);

      if (progressVal >= 100) {
        clearInterval(interval);
        setUploading(false);
        setFiles((prev) => [...prev, ...selectedFiles]);
        setProgress(0);
      }
    }, 100);
  };

  const handleDelete = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  return (
    <div className="resource-upload-container">
      <h2 className="page-title">{subject.toUpperCase()} - Add Resources</h2>

      {/* Upload Buttons */}
      <div className="upload-buttons-bar">
        <label className="upload-btn">
          + Upload Videos
          <input
            type="file"
            accept="video/*"
            multiple
            hidden
            onChange={(e) => handleFileChange(e, "video")}
          />
        </label>

        <label className="upload-btn">
          + Upload Notes
          <input
            type="file"
            accept=".pdf,.docx,.ppt,.txt"
            multiple
            hidden
            onChange={(e) => handleFileChange(e, "notes")}
          />
        </label>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Uploaded Files */}
      <div className="file-list">
        {files.length === 0 ? (
          <p>No files uploaded yet!</p>
        ) : (
          files.map((file, index) => (
            <div key={index} className="file-card">
              <span className="file-name">{file.name}</span>
              <span className="file-type">{file.type}</span>
              <button className="delete-btn" onClick={() => handleDelete(index)}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddResources;
