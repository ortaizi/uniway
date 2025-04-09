// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiClipboard, FiBookOpen } from 'react-icons/fi';
import './sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Uniway</div>
      <nav className="nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <FiHome className="nav-icon" />
          <span>בית</span>
        </NavLink>
        <NavLink to="/dashboard/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiMessageSquare className="nav-icon" />
          <span>צ'אט</span>
        </NavLink>
        <NavLink to="/dashboard/assignments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiClipboard className="nav-icon" />
          <span>מטלות</span>
        </NavLink>
        <NavLink to="/dashboard/courses" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiBookOpen className="nav-icon" />
          <span>קורסים</span>
        </NavLink>
      </nav>
    </aside>
  );
}