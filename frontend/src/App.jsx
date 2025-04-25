import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Work from './pages/work/Work.jsx';

import Home from './pages/work/home/Home.jsx';
import Chat from './pages/work/chat/Chat.jsx';
import Assignments from './pages/work/assignments/Assignments.jsx';
import Courses from './pages/work/courses/Courses.jsx';
import Grades from './pages/work/grades/Grades.jsx';
import Exams from './pages/work/exams/Exams.jsx';
import Military from './pages/work/military/Military.jsx';
import Schedule from './pages/work/schedule/Schedule.jsx';

import RequireLogin from './pages/work/components/RequireLogin.jsx'; // ✅ חדש

function App() {
  return (
    <Router>
      <Routes>
        {/* דף הנחיתה */}
        <Route path="/" element={<HomePage />} />

        {/* דף ההתחברות */}
        <Route path="/login" element={<Login />} />

        {/* עמוד העבודה – כולל סרגל צד ועליון */}
        <Route
          path="/work"
          element={
            <RequireLogin>
              <Work />
            </RequireLogin>
          }
        >
          <Route index element={<Home />} /> {/* תת-עמוד ברירת מחדל */}
          <Route path="chat" element={<Chat />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="courses" element={<Courses />} />
          <Route path="grades" element={<Grades />} />
          <Route path="exams" element={<Exams />} />
          <Route path="military" element={<Military />} />
          <Route path="schedule" element={<Schedule />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
