import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './Work.css';

function Work() {
  return (
    <div className="work-page">
      <div className="work-container">
        
        {/* סיידבר מימין עם רקע בהיר ועיצוב מעוגל */}
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        {/* תוכן ראשי */}
        <div className="main-wrapper">
          <Topbar />

          <div className="main-content">
            {/* כל תוכן הדשבורד מופיע כאן */}
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
