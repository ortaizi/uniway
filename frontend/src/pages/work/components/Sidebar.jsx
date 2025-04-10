import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiClipboard, FiBookOpen } from 'react-icons/fi';
import logo from '../../../assets/uniway-logo.png'; // נתיב הלוגו

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Uniway Logo" className="sidebar-logo" />
        <div className="sidebar-brand">
          <h1>Uniway</h1>
          <p>uniway.site</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/work" end className="nav-item">
          <FiHome className="nav-icon" />
          <span>בית</span>
        </NavLink>
        <NavLink to="/work/chat" className="nav-item">
          <FiMessageSquare className="nav-icon" />
          <span>צ'אט</span>
        </NavLink>
        <NavLink to="/work/assignments" className="nav-item">
          <FiClipboard className="nav-icon" />
          <span>מטלות</span>
        </NavLink>
        <NavLink to="/work/courses" className="nav-item">
          <FiBookOpen className="nav-icon" />
          <span>קורסים</span>
        </NavLink>
      </nav>
    </aside>
  );
}
