import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import './components/Sidebar.css';

export default function Work() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">
          <Outlet /> {/* מציג את התוכן המשתנה */}
        </div>
      </div>
    </div>
  );
}
