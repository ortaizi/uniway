import React from 'react';
import './dashboard.css';

import Sidebar from './sidebar';
import Header from './home/Header';
import CardsRow from './home/CardsRow';
import EventsPanel from './home/EventsPanel';
import EmailsPanel from './home/EmailsPanel';
import TodoList from './home/TodoList';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <Header />
        <CardsRow />
        <EventsPanel />
        <EmailsPanel />
        <TodoList />
      </main>
    </div>
  );
}
