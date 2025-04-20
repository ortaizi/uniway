import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiClipboard, FiBookOpen } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import './Sidebar.css';
import logo from '/src/assets/uniway-logo.png';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* לוגו */}
      <div className="logo-section">
       
        <div className="logo-text">
          <h1>Uniway</h1>
        </div>
        <img src={logo} alt="Uniway Logo" className="logo-image" />
      </div>

      {/* תפריט ניווט */}
      <nav className="nav-menu">
        <NavLink to="." end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiHome className="nav-icon" />
          <span>בית</span>
        </NavLink>
        <NavLink to="chat" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiMessageSquare className="nav-icon" />
          <span>צ'אט</span>
        </NavLink>
        <NavLink to="assignments" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiClipboard className="nav-icon" />
          <span>מטלות</span>
        </NavLink>
        <NavLink to="courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiBookOpen className="nav-icon" />
          <span>קורסים</span>
        </NavLink>
      </nav>

      {/* רשתות חברתיות */}
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/uniway.il/" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://wa.me/972537753717?text=היי%20הגעתי%20דרך%20הקישור%20ב-Uniway%2C%20אשמח%20לדבר%20איתך."
          target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
      </div>
    </aside>
  );
}
