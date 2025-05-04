import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles.css"; // assuming you want to keep the same styles

const TakeExam = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/take-exam/${subject}/${path}`);
  };

  return (
    <div className="teacher-subject-container">
      <h2>{subject.toUpperCase()} - Take Exam</h2>
      <div className="card-grid">
        <div className="option-card" onClick={() => handleNavigation("st_mcq")}>
          <h3>MCQ</h3>
          <p>Multiple Choice Questions</p>
        </div>
        <div className="option-card" onClick={() => handleNavigation("st_fill-ups")}>
          <h3>Fill Ups</h3>
          <p>Fill in the blanks</p>
        </div>
        <div className="option-card" onClick={() => handleNavigation("st_short-answer")}>
          <h3>Short Answers</h3>
          <p>Answer in brief</p>
        </div>
        <div className="option-card" onClick={() => handleNavigation("st_long-answer")}>
          <h3>Long Answers</h3>
          <p>Answer in detail</p>
        </div>
        <div className="option-card" onClick={() => handleNavigation("st_essay")}>
          <h3>Essay</h3>
          <p>Write an essay</p>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
