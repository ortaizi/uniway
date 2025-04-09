import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';
import './components/Sidebar.css';
import './components/Topbar.css';

export default function Work() {
  return (
    <div className="work-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet /> {/* This renders the nested route */}
        </div>
      </div>
    </div>
  );
}
