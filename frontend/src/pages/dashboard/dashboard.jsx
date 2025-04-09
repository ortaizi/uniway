import React from 'react';
import './dashboard.css';

import Sidebar from './sidebar';
import Header from './home/header';
import CardsRow from './home/cardsrow';
import EventsPanel from './home/eventspanel';
import EmailsPanel from './home/emailspanel';
import TodoList from './home/todolist';

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