// src/pages/SplashScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import logoImage from "/father.png"; // since it's in public folder
import "../styles.css";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the logo
    tl.fromTo(
      ".logo",
      { scale: 0, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Animate the text
    tl.fromTo(
      ".app-name",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "bounce.out",
        delay: 0.5,
      }
    );

    // Fade out and navigate after 4.5s
    tl.to(".splash-screen", {
      opacity: 0,
      duration: 1,
      delay: 4.5,
      onComplete: () => navigate("/rolebasedregistration"), // ✅ your target route
    });
  }, [navigate]);

  return (
    <div className="splash-screen">
      <div className="logo-container">
        <img src={logoImage} alt="Innoscribe Logo" className="logo" />
      </div>
      <h1 className="app-name">Innoscribe</h1>
    </div>
  );
};

export default SplashScreen;
