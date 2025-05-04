import React from "react";
import { useNavigate } from "react-router-dom"; // 🧭 Import useNavigate
import "../styles.css";

const RoleRegistration = () => {
  const navigate = useNavigate();

  const handleCardClick = (role) => {
    if (role === "Teacher") {
      navigate("/teacher-login");
    } else if (role === "Student") {
      navigate("/student-login");
    }
  }

  return (
    <div className="role-registration-container">
      <h2>Select Your Role</h2>
      <div className="big-card">
        {/* Teacher Card */}
        <div
          className="role-card"
          onClick={() => handleCardClick("Teacher")}
        >
          <div
            className="role-image"
            style={{
              backgroundImage: `url('/teacher.png')`, // Replace with actual teacher image path
            }}
          ></div>
          <div className="role-button-container">
            <button className="role-button">Select Teacher</button>
          </div>
        </div>

        {/* Student Card */}
        <div
          className="role-card"
          onClick={() => handleCardClick("Student")}
        >
          <div
            className="role-image"
            style={{
              backgroundImage: `url('/students.png')`, // Replace with actual student image path
            }}
          ></div>
          <div className="role-button-container">
            <button className="role-button">Select Student</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleRegistration;
