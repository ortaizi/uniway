import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './Work.css';

function Work() {
  return (
    <div className="work-page">
      <div className="work-container">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="main-wrapper">
          <Topbar />
          <div className="main-content">
            <div className="content-card">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
