import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartExam from "./pages/StartExam";
import Exam from "./pages/Exam";
import Result from "./pages/Result"; // 🆕 Import the new Result page
import ProtectedRoute from "./components/ProtectedRoute"; // adjust path if needed

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Wrap protected pages inside ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/start-exam" element={<StartExam />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/result" element={<Result />} /> {/* 🆕 Added result route */}
        </Route>
      </Routes>
    </Router>
  );
}
