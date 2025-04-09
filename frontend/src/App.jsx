import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Work from './pages/Work.jsx';

import Home from './pages/work/home/Home.jsx';
import Chat from './pages/work/chat/Chat.jsx';
import Assignments from './pages/work/assignments/Assignments.jsx';
import Courses from './pages/work/courses/Courses.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* דף הנחיתה */}
        <Route path="/" element={<HomePage />} />

        {/* דף ההתחברות */}
        <Route path="/login" element={<Login />} />

        {/* עמוד העבודה – כולל סרגל צד ועליון */}
        <Route path="/work" element={<Work />}>
          <Route index element={<Home />} /> {/* תת-עמוד ברירת מחדל */}
          <Route path="chat" element={<Chat />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
