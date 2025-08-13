import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import api from '../api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 2. Initialize navigate

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      
      // 3. Add navigation to Start Exam page
      navigate('/start-exam');
      
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      
      {message && (
        <div className={`message ${message.includes('success') ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}
      
      {/* Fallback link */}
      {message.includes('success') && (
        <div className="mt-4">
          <p>If not redirected automatically, <a href="/start-exam">click here to go to Start Exam</a></p>
        </div>
      )}
    </div>
  );
}