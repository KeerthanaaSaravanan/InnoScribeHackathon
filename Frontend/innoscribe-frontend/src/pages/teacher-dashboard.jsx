import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const teacherSubjects = [
  { name: "English", id: "english", logo: "/english.jpeg" },
  { name: "Maths", id: "maths", logo: "/maths.png" },
  { name: "Science", id: "science", logo: "/science.png" },
  { name: "Social", id: "social", logo: "/social.jpeg" },
  { name: "Life Skills", id: "life-skills", logo: "/lifeskills.jpeg" },
]; 

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/teacher/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, Ms.Keerthana S</h2>
      <div className="subject-grid">
        {teacherSubjects.map((subject) => (
          <div
            key={subject.id}
            className="subject-card"
            onClick={() => handleCardClick(subject.id)}
          >
            <img
              src={subject.logo}
              alt={`${subject.name} logo`}
              className="subject-logo"
            />
            <h3 className="subject-name">{subject.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
