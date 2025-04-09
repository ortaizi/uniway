// File: Topbar.jsx
import React from 'react';
import './Topbar.css';
import { FiMessageSquare, FiBell } from 'react-icons/fi';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg"
          alt="Logo"
          className="logo"
        />
      </div>

      <div className="topbar-center">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="topbar-right">
        <FiMessageSquare className="topbar-icon" />
        <FiBell className="topbar-icon" />
        <div className="profile">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="profile-pic"
          />
          <span className="profile-name">Courtney Henry</span>
        </div>
      </div>
    </header>
  );
}