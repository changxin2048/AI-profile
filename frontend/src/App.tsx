import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AIReminder from './pages/AIReminder';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aireminder" element={<AIReminder />} />
      </Routes>
    </Router>
  );
};

export default App; 