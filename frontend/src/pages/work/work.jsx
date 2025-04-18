import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './Work.css';

function Work() {
  return (
    <div className="work-page">
      <div className="work-container">
        
        {/* ✅ Sidebar ישירות בתוך container */}
        <Sidebar />

        <div className="main-wrapper">
          <div className="main-content">
            <div className="content-card">
              <Topbar />
              <Outlet />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Work;