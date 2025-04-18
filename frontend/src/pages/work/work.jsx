import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './Work.css';

function Work() {
  return (
    <div className="work-page">
      <div className="work-card">
        <Sidebar />

        <div className="main-wrapper">

          <div className="main-content">
            <div className="inner-content-card"> {/* ✅ כרטיסייה פנימית רק ל־Outlet */}
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
