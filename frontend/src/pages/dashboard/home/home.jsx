// Home.jsx
import React from 'react';
import CardsRow from './CardsRow';
import EventsPanel from './EventsPanel';
import EmailsPanel from './EmailsPanel';
import TodoList from './TodoList';
import './home.css';

export default function Home() {
  return (
    <div className="home-container">
      <CardsRow />

      <div className="panels-grid">
        <div className="left-panels">
          <EventsPanel />
          <EmailsPanel />
        </div>
        <div className="right-panel">
          <TodoList />
        </div>
      </div>
    </div>
  );
}