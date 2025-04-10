import React from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import './Topbar.css';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-icons">
        <FiBell className="topbar-icon" />
        <FiUser className="topbar-icon" />
      </div>
    </header>
  );
}