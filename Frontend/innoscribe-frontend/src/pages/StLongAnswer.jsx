import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const longAnswerQuestions = {
  english: [
    { question: "Explain the significance of Shakespeare's work.", answer: "Shakespeare's work revolutionized literature." },
    { question: "Discuss the causes of the American Revolution.", answer: "The American Revolution was caused by various political and economic factors." },
  ],
  math: [
    { question: "Explain how the Pythagorean theorem works.", answer: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides." },
    { question: "What is calculus and why is it important?", answer: "Calculus is the study of change, and it's essential in fields like physics, engineering, and economics." },
  ],
  science: [
    { question: "What is photosynthesis and why is it important?", answer: "Photosynthesis is the process by which plants convert sunlight into chemical energy, and it's essential for life on Earth." },
    { question: "Explain the water cycle.", answer: "The water cycle describes how water evaporates, condenses into clouds, and returns to the Earth as precipitation." },
  ],
  social: [
    { question: "Describe the social impact of the Industrial Revolution.", answer: "The Industrial Revolution led to urbanization, changing family structures, and improving living standards for some." },
    { question: "What were the effects of colonialism?", answer: "Colonialism caused economic exploitation, cultural shifts, and resistance movements worldwide." },
  ],
  "life-skills": [
    { question: "Why is time management important?", answer: "Time management is important because it helps people prioritize tasks and work efficiently." },
    { question: "Discuss the importance of teamwork.", answer: "Teamwork promotes collaboration, problem-solving, and enhances productivity." },
  ],
};

const StLongAnswer = () => {
  const { subject } = useParams();
  const questions = longAnswerQuestions[subject];
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
        Long Answer - {subject.toUpperCase()}
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

export default StLongAnswer;
