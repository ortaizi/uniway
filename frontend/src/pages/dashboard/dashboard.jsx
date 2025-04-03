import './dashboard.css';
import logo from '../../assets/uniway-logo.png';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Uniway Logo" />
          <h2 style={{ color: '#0e6b67' }}>Uniway</h2>
        </div>
        <nav className="nav-links">
          <Link to="/dashboard" className="nav-item active">AI Assistant</Link>
          <Link to="/dashboard/assignments" className="nav-item">Assignments</Link>
          <Link to="/dashboard/events" className="nav-item">Events</Link>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <button className="logout-btn">Logout</button>
        </header>

        <section className="dashboard">
          <Outlet /> {/* Render nested components here */}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
