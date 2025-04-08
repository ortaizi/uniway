import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Uniway</div>
      <nav className="nav-menu">
        <a href="#" className="nav-item">🏠 בית</a>
        <a href="#" className="nav-item">💬 צ'אט</a>
        <a href="#" className="nav-item">📋 מטלות</a>
        <a href="#" className="nav-item">📚 קורסים</a>
      </nav>
    </aside>
  );
}
