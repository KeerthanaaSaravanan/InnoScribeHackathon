import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const essayQuestions = {
  english: [
    { question: "Write an essay on the impact of technology on society.", answer: "" },
    { question: "Describe the significance of climate change in the modern world.", answer: "" },
  ],
  math: [
    { question: "Explain the importance of calculus in real-life applications.", answer: "" },
    { question: "Write an essay on the history and applications of probability theory.", answer: "" },
  ],
  science: [
    { question: "Write about the role of renewable energy in mitigating global warming.", answer: "" },
    { question: "Discuss the significance of space exploration and its impact on humanity.", answer: "" },
  ],
  social: [
    { question: "Write about the role of media in shaping public opinion.", answer: "" },
    { question: "Describe the consequences of social inequality in modern societies.", answer: "" },
  ],
  "life-skills": [
    { question: "Explain the importance of emotional intelligence in personal growth.", answer: "" },
    { question: "Write an essay on the significance of time management in achieving success.", answer: "" },
  ],
};

const StEssayWriting = () => {
  const { subject } = useParams();
  const questions = essayQuestions[subject];
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
    const answer = isDictation ? spokenAnswer.trim() : userAnswer.trim();
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
        Essay Writing - {subject.toUpperCase()}
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
                  style={{ width: "100%", height: "300px", padding: "10px", fontSize: "16px" }}
                  placeholder="Write your essay here..."
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

export default StEssayWriting;

