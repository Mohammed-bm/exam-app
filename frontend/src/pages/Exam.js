import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Exam() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Questions from navigation state
  const questions = useMemo(() => state?.questions || [], [state?.questions]);

  // Finish exam and submit to backend
  const handleFinish = useCallback(() => {
    const token = localStorage.getItem('token'); // must be set during login

    if (!token) {
      alert("You are not logged in. Please log in again.");
      navigate("/login");
      return;
    }

    // Payload matches backend expectation
    const payload = {
      answers: questions.reduce((acc, q, index) => {
        if (selectedOptions[index] !== undefined) {
          acc[q._id] = selectedOptions[index];
        }
        return acc;
      }, {})
    };

    console.log("📤 Sending to backend:", payload);

    fetch('http://localhost:5000/api/exam/submit-exam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("📥 Backend response:", data);

        if (data?.score !== undefined && data?.total !== undefined) {
          navigate("/result", { state: { result: data } });
        } else {
          alert("Something went wrong with grading. Please try again.");
        }
      })
      .catch(err => {
        console.error("❌ Error submitting exam:", err);
        alert("Error submitting exam. Please try again.");
      });
  }, [navigate, selectedOptions, questions]);

  // Timer countdown
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

  // Format time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Handle option select
  const handleOptionSelect = (index) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: index,
    });
  };

  // Navigation
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

  // No questions
  if (!questions.length) {
    return <div className="container">No questions available</div>;
  }

  return (
    <div className="exam-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Question {currentQuestion + 1}/{questions.length}</h3>
        <div className="timer">
          <strong>Time Left:</strong> {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <p>{questions[currentQuestion].questionText}</p>

      {/* Options */}
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

      {/* Navigation buttons */}
      <div style={{ marginTop: "20px", display: 'flex', gap: '10px' }}>
        {currentQuestion > 0 && (
          <button onClick={handlePrevious} className="btn btn-secondary">
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
