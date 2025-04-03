import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import AIAssistant from './pages/dashboard/aiassistant/aiassistant.jsx';
import Assignments from './pages/dashboard/assignments/assignments.jsx';
import Events from './pages/dashboard/events/events.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<AIAssistant />} /> {/* 👈 default landing page */}
          <Route path="assignments" element={<Assignments />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;