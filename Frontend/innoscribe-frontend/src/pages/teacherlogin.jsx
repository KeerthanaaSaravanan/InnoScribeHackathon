import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

import logo from "/father.png";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/teacher-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="InnoScribe Logo" className="login-logo-inside" />
        <h2>Teacher Login</h2>

        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="submit-btn" type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default TeacherLogin;