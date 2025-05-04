import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

const TeacherSubject = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  return (
    <div className="teacher-subject-container">
      <h2>{subject.toUpperCase()}</h2>
      <div className="card-grid">
        <div
          className="option-card"
          onClick={() => navigate(`/upload-notes/${subject}`)}
        >
          <h3>Add Resources</h3>
          <p>Upload Notes & Videos</p>
        </div>
        <div
          className="option-card"
          onClick={() => navigate(`/add-questions/${subject}`)}
        >
          <h3>Add Questions</h3>
          <p>Long/Short Answer + Fillups</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubject;
