import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function StartExam() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/exam/start-exam', {
        headers: { 'x-auth-token': token }
      });
      navigate('/exam', { state: { questions: response.data } });
    } catch (err) {
      console.error('Failed to start exam:', err);
      alert('Please login first!');
    } finally {
      setLoading(false);
    }
  };

// Replace your return statement with:
    return (
    <div className="container">
        <h2>Ready for Your Exam?</h2>
        <button 
        onClick={handleStart} 
        disabled={loading}
        className="btn btn-primary"
        >
        {loading ? 'Loading Questions...' : 'Start Exam Now'}
        </button>
    </div>
    );
}