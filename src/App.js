import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Games from './pages/Games';

function App() {
  return (
    <Router basename="/TFG-FRONT">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </Router>
  );
}

export default App;
