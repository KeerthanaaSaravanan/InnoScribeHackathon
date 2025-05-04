import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UploadNotes = () => {
  const { subject } = useParams();
  const [notesFile, setNotesFile] = useState(null);

  const handleFileChange = (e) => {
    setNotesFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (notesFile) {
      alert(`${subject} Notes uploaded successfully!`);
      // Add your upload logic here (e.g., uploading to a cloud service)
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div>
      <h2>Upload Notes for {subject}</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadNotes;
