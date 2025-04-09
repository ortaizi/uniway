// Home.jsx
import React from 'react';
import CardsRow from './cardsrow';
import EventsPanel from './eventspanel';
import EmailsPanel from './emailspanel';
import TodoList from './todolist';
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