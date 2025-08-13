import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Exam() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // 🆕 Memoize questions so ESLint is happy and it doesn't recreate array every render
  const questions = useMemo(() => state?.questions || [], [state?.questions]);

  const handleFinish = useCallback(() => {
    console.log("Selected Answers:", selectedOptions);
    alert("Exam Finished!");
    navigate("/result", { state: { answers: selectedOptions, questions } });
  }, [navigate, selectedOptions, questions]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, handleFinish]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

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

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!questions.length) {
    return <div className="container">No questions available</div>;
  }

  return (
    <div className="exam-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Question {currentQuestion + 1}/{questions.length}</h3>
        <div className="timer">
          <strong>Time Left:</strong> {formatTime(timeLeft)}
        </div>
      </div>

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

      <div style={{ marginTop: "20px", display: 'flex', gap: '10px' }}>
        {currentQuestion > 0 && (
          <button
            onClick={handlePrevious}
            className="btn btn-secondary"
          >
            Previous Question
          </button>
        )}

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
