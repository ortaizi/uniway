import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiClipboard, FiBookOpen } from 'react-icons/fi';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Uniway</div>
      <nav className="nav-menu">
        <NavLink to="/work" end className="nav-item">
          {({ isActive }) => (
            <div className={`nav-item ${isActive ? 'active' : ''}`}>
              <FiHome className="nav-icon" />
              <span>בית</span>
            </div>
          )}
        </NavLink>

        <NavLink to="/work/chat" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FiMessageSquare className="nav-icon" />
          <span>צ'אט</span>
        </NavLink>

        <NavLink to="/work/assignments" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FiClipboard className="nav-icon" />
          <span>מטלות</span>
        </NavLink>

        <NavLink to="/work/courses" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <FiBookOpen className="nav-icon" />
          <span>קורסים</span>
        </NavLink>
      </nav>
    </aside>
  );
}
