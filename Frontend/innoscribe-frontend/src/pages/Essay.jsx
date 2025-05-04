import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const LongAnswer = () => {
  const { subject } = useParams();
  const [question, setQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === '') return;

    setQuestionsList((prev) => [...prev, question]);
    setQuestion('');
  };

  const handleDelete = (indexToDelete) => {
    setQuestionsList((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={containerStyle}>
      <h2>📝 Add Essay Questions</h2>
      <p style={{ color: '#555' }}>
        Subject: <strong>{subject}</strong>
      </p>

      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>Question:</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          style={inputStyle}
          placeholder="Type your essay question here"
          required
        />
        <button type="submit" style={buttonStyle}>Add Question</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h3>📋 Added Questions:</h3>
        {questionsList.length === 0 ? (
          <p style={{ color: '#888' }}>No questions added yet.</p>
        ) : (
          <ul style={listStyle}>
            {questionsList.map((q, index) => (
              <li key={index} style={listItemStyle}>
                <span><strong>{index + 1}.</strong> {q}</span>
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
  gap: '15px',
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
  resize: 'vertical'
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
  alignItems: 'center'
};

const deleteButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#e74c3c',
  fontSize: '18px',
  cursor: 'pointer'
};

export default LongAnswer;
