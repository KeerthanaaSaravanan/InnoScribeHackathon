import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "../styles.css";

const fillUpQuestions = {
  english: [
    { question: "The cat ___ on the mat.", answer: "sat" },
    { question: "She ___ a beautiful painting.", answer: "painted" },
  ],
  math: [
    { question: "5 + 7 = ___", answer: "12" },
    { question: "The square root of 16 is ___", answer: "4" },
  ],
  science: [
    { question: "Water boils at ___ degrees Celsius.", answer: "100" },
    { question: "The chemical symbol for water is ___", answer: "H2O" },
  ],
  social: [
    { question: "The capital of India is ___", answer: "New Delhi" },
    { question: "The first President of the United States was ___", answer: "George Washington" },
  ],
  "life-skills": [
    { question: "Time management is important because it helps you ___", answer: "be productive" },
    { question: "Good communication skills are important for ___", answer: "effective teamwork" },
  ],
};

const StFillUps = () => {
  const { subject } = useParams();
  const questions = fillUpQuestions[subject];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDictation, setIsDictation] = useState(false);
  const [spokenAnswer, setSpokenAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const startDictation = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.start();
      recognition.onresult = (event) => {
        setSpokenAnswer(event.results[0][0].transcript);
      };
      recognition.onend = () => setIsRecording(false);
    } else {
      alert("Speech recognition is not supported on this browser.");
    }
  };

  const readQuestionAloud = (text) => {
    const cleanedText = text.replace(/_+/g, " dash ");
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    speechSynthesis.speak(utterance);
  };

  const launchWrittenMode = async () => {
    try {
      const response = await fetch('http://localhost:5000/launch-handwriting', {
        method: 'POST',
      });
  
      if (response.ok) {
        // Open a new popup window (for handwriting mode)
        window.open('http://localhost:5000/handwriting-popup', '_blank', 'width=800,height=600');
      } else {
        alert('Failed to launch handwriting mode.');
      }
    } catch (error) {
      alert('Error launching handwriting mode!');
    }
  };

  const handleNext = () => {
    const answer = isDictation ? spokenAnswer.trim().toLowerCase() : userAnswer.trim().toLowerCase();
    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextAnswer = answers[currentIndex + 1] || "";
      setUserAnswer(nextAnswer);
      setSpokenAnswer(nextAnswer);
    } else {
      // Final question - calculate score
      let calculatedScore = 0;
      questions.forEach((q, index) => {
        const userAns = answers[index] || (index === currentIndex ? answer : "");
        if (userAns.trim().toLowerCase() === q.answer.trim().toLowerCase()) {
          calculatedScore++;
        }
      });
      setScore(calculatedScore);
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer(answers[currentIndex - 1] || "");
      setSpokenAnswer(answers[currentIndex - 1] || "");
    }
  };

  return (
    <div className="fillup-container">
      <h2>Fill In The Blanks - {subject.toUpperCase()}</h2>

      {showScore ? (
        <div className="score-container">
          <h3>Your Score: {score} / {questions.length}</h3>
        </div>
      ) : (
        <>
          <div className="question-container">
            <div className="question">
              <p style={{ fontSize: "20px", marginRight: "10px" }}>
                {currentQuestion.question}
              </p>
              <button className="circle-button" onClick={() => readQuestionAloud(currentQuestion.question)}>
                <FaVolumeUp />
              </button>
            </div>

            <div className="modes-container">
              <button
                className={`mode-btn ${isDictation ? "active" : ""}`}
                onClick={() => setIsDictation(true)}
              >
                Dictation Mode
              </button>
              <button
                className={`mode-btn ${!isDictation ? "active" : ""}`}
                onClick={() => {
                  setIsDictation(false);
                  launchWrittenMode();
                }}
              >
                Written Mode
              </button>
            </div>

            {isDictation ? (
              <div className="dictation-mode">
                <button onClick={() => !isRecording && (setIsRecording(true), startDictation())}>
                  {isRecording ? "Recording..." : "Start Recording"}
                </button>
                <textarea
                  placeholder="Your spoken answer will appear here..."
                  value={spokenAnswer}
                  onChange={(e) => setSpokenAnswer(e.target.value)}
                  disabled
                />
              </div>
            ) : (
              <div className="written-mode">
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext}>
              {currentIndex === questions.length - 1 ? "Submit" : "Save and Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StFillUps;
