import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";

const StudentSubject = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  return (
    <div className="teacher-subject-container">
      <h2>{subject.toUpperCase()}</h2>
      <div className="card-grid">
        <div
          className="option-card"
          onClick={() => navigate(`/view-resources/${subject}`)}
        >
          <h3>View Resources</h3>
          <p>Notes & Videos</p>
        </div>
        <div
          className="option-card"
          onClick={() => navigate(`/take-exam/${subject}`)}
        >
          <h3>Take Exam</h3>
          <p>MCQ, Long/Short Answers, Fillups</p>
        </div>
      </div>
    </div>
  );
};

export default StudentSubject;
