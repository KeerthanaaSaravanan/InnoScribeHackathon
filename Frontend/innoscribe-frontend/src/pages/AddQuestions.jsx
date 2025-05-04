import React from 'react';
import { Link, useParams } from 'react-router-dom';

const AddQuestions = () => {
  const { subject } = useParams(); // 👈 Grab subject from the URL

  return (
    <div style={{ padding: '20px' }}>
      <h1>{subject?.toUpperCase()} - Question Types</h1>

      <div
        className="card-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <div className="card" style={cardStyle}>
          <h3>FillUps</h3>
          <p>Fill in the blanks questions</p>
          <Link to={`/fill-ups/${subject}`}>
            <button style={buttonStyle}>Go to FillUps</button>
          </Link>
        </div>

        <div className="card" style={cardStyle}>
          <h3>MCQ</h3>
          <p>Multiple Choice Questions</p>
          <Link to={`/mcq/${subject}`}>
            <button style={buttonStyle}>Go to MCQ</button>
          </Link>
        </div>

        <div className="card" style={cardStyle}>
          <h3>Essay</h3>
          <p>Write your Essay here</p>
          <Link to={`/essay/${subject}`}>
            <button style={buttonStyle}>Go to Essay</button>
          </Link>
        </div>

        <div className="card" style={cardStyle}>
          <h3>Short Answers</h3>
          <p>Short answer questions</p>
          <Link to={`/short-answer/${subject}`}>
            <button style={buttonStyle}>Go to Short Answers</button>
          </Link>
        </div>

        <div className="card" style={cardStyle}>
          <h3>Long Answers</h3>
          <p>Detailed long answer questions</p>
          <Link to={`/long-answer/${subject}`}>
            <button style={buttonStyle}>Go to Long Answers</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default AddQuestions;
