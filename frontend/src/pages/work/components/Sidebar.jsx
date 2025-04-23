import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiClipboard,
  FiBookOpen,
  FiBarChart2,
  FiCalendar,
  FiMessageCircle,
  FiShield,
  FiClock
} from 'react-icons/fi';
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
        <NavLink to="assignments" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiClipboard className="nav-icon" />
          <span>מטלות</span>
        </NavLink>
        <NavLink to="courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiBookOpen className="nav-icon" />
          <span>קורסים</span>
        </NavLink>
        <NavLink to="grades" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiBarChart2 className="nav-icon" />
          <span>ציונים</span>
        </NavLink>
        <NavLink to="exams" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiCalendar className="nav-icon" />
          <span>מבחנים</span>
        </NavLink>
        <NavLink to="chat" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiMessageCircle className="nav-icon" />
          <span>צ׳אט</span>
        </NavLink>
        <NavLink to="military" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiShield className="nav-icon" />
          <span>מילואים</span>
        </NavLink>
        <NavLink to="schedule" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FiClock className="nav-icon" />
          <span>מערכת שעות</span>
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
