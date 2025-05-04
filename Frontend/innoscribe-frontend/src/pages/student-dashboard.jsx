import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// Student subjects array - exactly 5 subjects just like the teacher dashboard
const studentSubjects = [
  { name: "English", id: "english", logo: "/english.jpeg" },
  { name: "Math", id: "math", logo: "/maths.png" },
  { name: "Science", id: "science", logo: "/science.png" },
  { name: "Social", id: "social", logo: "/social.jpeg" },
  { name: "Life Skills", id: "life-skills", logo: "/lifeskills.jpeg" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/student/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, Kishore 👋</h2>
      <div className="subject-grid">
        {studentSubjects.map((subject) => (
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

export default StudentDashboard;
