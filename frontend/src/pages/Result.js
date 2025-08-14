import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Log received state for debugging
  useEffect(() => {
    console.log("📄 Result.js received state:", state);
    if (!state?.result) {
      console.warn("⚠ No result data found, redirecting to start exam...");
      navigate("/start-exam");
    }
  }, [state, navigate]);

  // Safely extract result data
  const score = state?.result?.score ?? 0;
  const total = state?.result?.total ?? 0;
  const percentage = state?.result?.percentage ?? "0.00";

  return (
    <div className="result-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Exam Results</h2>
      <div style={{
        border: '1px solid #ccc',
        padding: '20px',
        width: '200px',
        margin: '20px auto',
        borderRadius: '8px'
      }}>
        <p><strong>Score:</strong> {score} / {total}</p>
        <p><strong>Percentage:</strong> {percentage}%</p>
      </div>
      <button
        onClick={() => navigate('/start-exam')}
        className="btn btn-success"
        style={{ marginRight: '10px' }}
      >
        Take Exam Again
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary"
      >
        Go Back
      </button>
    </div>
  );
}
