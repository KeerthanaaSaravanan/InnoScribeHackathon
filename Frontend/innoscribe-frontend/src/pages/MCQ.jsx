import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MCQ = () => {
  const { subject } = useParams();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questionsList, setQuestionsList] = useState([]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      question.trim() === '' ||
      options.some(opt => opt.trim() === '') ||
      correctAnswerIndex === null
    )
      return;

    const newQuestion = {
      question,
      options,
      correctAnswerIndex
    };

    setQuestionsList(prev => [...prev, newQuestion]);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex(null);
  };

  const handleDelete = (indexToDelete) => {
    setQuestionsList(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={containerStyle}>
      <h2>❓ Add MCQ Questions</h2>
      <p style={{ color: '#555' }}>
        Subject: <strong>{subject}</strong>
      </p>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Question:</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={2}
          style={inputStyle}
          placeholder="Enter the MCQ question"
          required
        />

        <label style={labelStyle}>Options (Select the correct one):</label>
        {options.map((opt, idx) => (
          <div key={idx} style={radioOptionStyle}>
            <input
              type="radio"
              name="correctAnswer"
              value={idx}
              checked={correctAnswerIndex === idx}
              onChange={() => setCorrectAnswerIndex(idx)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              style={inputStyle}
              required
            />
          </div>
        ))}

        <button type="submit" style={buttonStyle}>Add MCQ</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h3>📋 Added Questions:</h3>
        {questionsList.length === 0 ? (
          <p style={{ color: '#888' }}>No MCQs added yet.</p>
        ) : (
          <ul style={listStyle}>
            {questionsList.map((item, index) => (
              <li key={index} style={listItemStyle}>
                <div>
                  <strong>{index + 1}.</strong> {item.question}
                  <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                    {item.options.map((opt, i) => (
                      <li key={i}>
                        {item.correctAnswerIndex === i ? '✅' : '🔹'} {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  style={deleteButtonStyle}
                  title="Delete Question"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = {
  padding: '30px',
  maxWidth: '700px',
  margin: 'auto',
  backgroundColor: '#fdfdfd',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '20px'
};

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '16px'
};

const inputStyle = {
  padding: '10px',
  fontSize: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%'
};

const radioOptionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#0090C1',
  color: '#fff',
  fontSize: '15px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const listStyle = {
  listStyleType: 'none',
  paddingLeft: '0',
  marginTop: '15px'
};

const listItemStyle = {
  background: '#f0f0f0',
  padding: '10px 15px',
  borderRadius: '6px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
};

const deleteButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#e74c3c',
  fontSize: '18px',
  cursor: 'pointer',
  marginLeft: '15px'
};

export default MCQ;
