import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Exam() {
  const { state } = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // stores answers
  const questions = state?.questions || [];

  const handleOptionSelect = (index) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: index,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinish = () => {
    console.log("Selected Answers:", selectedOptions);
    alert("Exam Finished! Check console for selected answers.");
  };

  if (!questions.length) {
    return <div className="container">No questions available</div>;
  }

  return (
    <div className="exam-container">
      <h3>Question {currentQuestion + 1}/{questions.length}</h3>
      <p>{questions[currentQuestion].questionText}</p>

      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOptions[currentQuestion] === index ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(index)}
          >
            <input
              type="radio"
              id={`option-${index}`}
              name={`answer-${currentQuestion}`}
              checked={selectedOptions[currentQuestion] === index}
              onChange={() => {}}
            />
            <label htmlFor={`option-${index}`}>
              {option.text}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={selectedOptions[currentQuestion] === undefined}
            className="btn btn-primary"
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={selectedOptions[currentQuestion] === undefined}
            className="btn btn-success"
          >
            Finish Exam
          </button>
        )}
      </div>
    </div>
  );
}
