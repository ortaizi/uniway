import React from 'react';
import { FiHome, FiMessageSquare, FiClipboard, FiBookOpen } from 'react-icons/fi';
import './Sidebar.css'; // Assuming you have a CSS file for styling
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Uniway</div>
      <nav className="nav-menu">
        <a href="#" className="nav-item">
          <FiHome className="nav-icon" />
          <span>בית</span>
        </a>
        <a href="#" className="nav-item">
          <FiMessageSquare className="nav-icon" />
          <span>צ'אט</span>
        </a>
        <a href="#" className="nav-item">
          <FiClipboard className="nav-icon" />
          <span>מטלות</span>
        </a>
        <a href="#" className="nav-item">
          <FiBookOpen className="nav-icon" />
          <span>קורסים</span>
        </a>
      </nav>
    </aside>
  );
}
