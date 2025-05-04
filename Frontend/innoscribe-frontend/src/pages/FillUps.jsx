import React, { useState } from 'react';

const FillUps = () => {
  const [question, setQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([]);

  const handleAddQuestion = () => {
    if (question.trim() !== '') {
      setQuestionsList([...questionsList, question]);
      setQuestion('');
    }
  };

  const handleRemoveQuestion = (index) => {
    const newList = questionsList.filter((_, i) => i !== index);
    setQuestionsList(newList);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>FillUps - Add Questions</h1>
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. The capital of France is _____"
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />
        <button
          onClick={handleAddQuestion}
          style={{ padding: '10px 15px', marginLeft: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Add Question
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Added Questions:</h3>
        {questionsList.length === 0 ? (
          <p>No questions added yet!</p>
        ) : (
          <ul>
            {questionsList.map((q, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {q}{' '}
                <button
                  onClick={() => handleRemoveQuestion(index)}
                  style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FillUps;
