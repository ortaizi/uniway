import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import DashboardHome from './pages/dashboard/home/home.jsx';
import Chat from './pages/dashboard/chat/chat.jsx';
import Assignments from './pages/dashboard/assignments/assignments.jsx';
import Courses from './pages/dashboard/courses/courses.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* דף נחיתה ראשי */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} /> {/* דף הבית של הדשבורד */}
          <Route path="chat" element={<Chat />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
