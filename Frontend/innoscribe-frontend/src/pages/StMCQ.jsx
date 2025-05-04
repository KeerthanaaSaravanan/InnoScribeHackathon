import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const questionBank = {
  english: [
    {
      question: "What is the synonym of 'happy'?",
      options: ["Sad", "Angry", "Joyful", "Tired"],
      answer: 2,
    },
    {
      question: "Choose the correct spelling:",
      options: ["Accomodation", "Acommodation", "Accommodation", "Accomadation"],
      answer: 2,
    },
  ],
  math: [
    {
      question: "What is 7 × 8?",
      options: ["54", "56", "58", "64"],
      answer: 1,
    },
    {
      question: "What is the square root of 144?",
      options: ["11", "13", "12", "10"],
      answer: 2,
    },
  ],
  science: [
    {
      question: "What gas do plants release during photosynthesis?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: 0,
    },
    {
      question: "Which organ pumps blood throughout the body?",
      options: ["Brain", "Heart", "Liver", "Kidney"],
      answer: 1,
    },
  ],
  social: [
    {
      question: "Who was the first President of India?",
      options: ["Mahatma Gandhi", "B.R. Ambedkar", "Jawaharlal Nehru", "Dr. Rajendra Prasad"],
      answer: 3,
    },
    {
      question: "The Great Wall of China was built to:",
      options: ["Mark territory", "Protect against invasions", "Attract tourists", "Block trade routes"],
      answer: 1,
    },
  ],
  "life-skills": [
    {
      question: "What is the first step in problem solving?",
      options: ["Jump to a solution", "Identify the problem", "Ask a friend", "Panic"],
      answer: 1,
    },
    {
      question: "Which of these is a good time management strategy?",
      options: ["Procrastinate", "Multitasking", "Creating a schedule", "Ignoring deadlines"],
      answer: 2,
    },
  ],
};

const StMCQ = () => {
  const { subject } = useParams();
  const currentSubject = subject.toLowerCase();
  const questions = questionBank[currentSubject] || [];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionChange = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = index;
    setAnswers(updatedAnswers);
  };

  const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(questions[current].question);
    window.speechSynthesis.speak(utterance);
  };

  const handleFinishExam = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].answer);
    const score = (correctAnswers.length / questions.length) * 100;
    return score;
  };

  const getEmoji = (score) => {
    if (score === 100) return "🎉 Excellent!";
    if (score >= 80) return "😊 Good Job!";
    if (score >= 50) return "😅 Keep Trying!";
    return "😞 Better Luck Next Time!";
  };

  if (isFinished) {
    const score = calculateScore();
    const emoji = getEmoji(score);

    return (
      <div
        style={{
          width: "600px",
          height: "450px", // Fixed height
          margin: "30px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#333" }}>Your Score: {score}%</h2>
        <div style={{ fontSize: "30px", margin: "20px 0" }}>{emoji}</div>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "600px",
        height: "450px", // Fixed height
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        overflowY: "auto", // Add scroll if content overflows
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        {subject.toUpperCase()} - MCQs
      </h2>

      {questions.length > 0 ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Q{current + 1}:</strong> {questions[current].question}
              <button
                onClick={handleReadAloud}
                style={{
                  background: "none",
                  border: "none",
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "#007bff",
                }}
              >
                <FaVolumeUp />
              </button>
            </div>

            <div>
              {questions[current].options.map((option, index) => (
                <label
                  key={index}
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    backgroundColor:
                      answers[current] === index ? "#d0f0c0" : "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${current}`}
                    checked={answers[current] === index}
                    onChange={() => handleOptionChange(index)}
                    style={{ marginRight: "10px" }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ccc",
                border: "none",
                borderRadius: "5px",
                cursor: current === 0 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (current < questions.length - 1) {
                  setCurrent(current + 1);
                } else {
                  handleFinishExam();
                }
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {current < questions.length - 1 ? "Save and Next" : "Finish Exam"}
            </button>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          No questions found for this subject.
        </p>
      )}
    </div>
  );
};

export default StMCQ;
