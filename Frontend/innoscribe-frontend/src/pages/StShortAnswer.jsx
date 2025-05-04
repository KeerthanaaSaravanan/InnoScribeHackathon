import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const shortAnswerQuestions = {
  english: [
    { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
    { question: "What is the capital of France?", answer: "Paris" },
  ],
  math: [
    { question: "What is 5 + 3?", answer: "8" },
    { question: "What is the square root of 16?", answer: "4" },
  ],
  science: [
    { question: "What is the chemical symbol for water?", answer: "H2O" },
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
  ],
  social: [
    { question: "Who was the first president of the USA?", answer: "George Washington" },
    { question: "What is the longest river in the world?", answer: "Nile" },
  ],
  "life-skills": [
    { question: "Why is good communication important?", answer: "It helps in understanding and resolving conflicts." },
    { question: "What is emotional intelligence?", answer: "The ability to identify and manage one's own emotions, and the emotions of others." },
  ],
};

const StShortAnswer = () => {
  const { subject } = useParams();
  const questions = shortAnswerQuestions[subject];
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px" }}>
        Short Answer - {subject.toUpperCase()}
      </h2>

      {showScore ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Your Score: {score} / {questions.length}</h3>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "30px" }}>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: "20px", marginRight: "10px" }}>
                {currentQuestion.question}
              </p>
              <button 
                style={{ borderRadius: "50%", padding: "10px", backgroundColor: "#0090C1", color: "white", border: "none", cursor: "pointer" }} 
                onClick={() => readQuestionAloud(currentQuestion.question)}>
                <FaVolumeUp />
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <button
                style={{
                  padding: "10px 20px", 
                  backgroundColor: isDictation ? "#0090C1" : "#f1f1f1", 
                  border: "none", 
                  color: isDictation ? "white" : "black", 
                  cursor: "pointer", 
                  marginRight: "10px"
                }}
                onClick={() => setIsDictation(true)}
              >
                Dictation Mode
              </button>
              <button
                style={{
                  padding: "10px 20px", 
                  backgroundColor: !isDictation ? "#0090C1" : "#f1f1f1", 
                  border: "none", 
                  color: !isDictation ? "white" : "black", 
                  cursor: "pointer"
                }}
                onClick={() => {
                  setIsDictation(false);
                  launchWrittenMode();
                }}
              >
                Written Mode
              </button>
            </div>

            {isDictation ? (
              <div style={{ marginTop: "20px" }}>
                <button 
                  style={{ padding: "10px 20px", backgroundColor: isRecording ? "#ff4747" : "#28a745", color: "white", border: "none", cursor: "pointer" }} 
                  onClick={() => !isRecording && (setIsRecording(true), startDictation())}>
                  {isRecording ? "Recording..." : "Start Recording"}
                </button>
                <textarea
                  style={{ width: "100%", height: "150px", marginTop: "10px", padding: "10px", fontSize: "16px" }}
                  placeholder="Your spoken answer will appear here..."
                  value={spokenAnswer}
                  onChange={(e) => setSpokenAnswer(e.target.value)}
                  disabled
                />
              </div>
            ) : (
              <div style={{ marginTop: "20px" }}>
                <textarea
                  style={{ width: "100%", height: "150px", padding: "10px", fontSize: "16px" }}
                  placeholder="Write your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button 
              style={{ padding: "10px 20px", backgroundColor: "#ddd", border: "none", cursor: "pointer" }} 
              onClick={handlePrevious} 
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button 
              style={{ padding: "10px 20px", backgroundColor: "#0090C1", color: "white", border: "none", cursor: "pointer" }} 
              onClick={handleNext}
            >
              {currentIndex === questions.length - 1 ? "Submit" : "Save and Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StShortAnswer;
