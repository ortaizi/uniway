import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '@/features/home/Home';
import Login from '@/features/auth/Login';
import Work from '@/features/dashboard/Work';

import Home from '@/features/dashboard/home/Home';
import Chat from '@/features/dashboard/chat/Chat';
import Assignments from '@/features/dashboard/assignments/Assignments';
import Courses from '@/features/dashboard/courses/Courses';
import Grades from '@/features/dashboard/grades/Grades';
import Exams from '@/features/dashboard/exams/Exams';
import Military from '@/features/dashboard/military/Military';
import Schedule from '@/features/dashboard/schedule/Schedule';

import RequireLogin from '@/features/auth/RequireLogin';

const App: React.FC = () => {
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
};

export default App; 