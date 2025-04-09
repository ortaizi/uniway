import React from 'react';
import './Home.css';
import Header from './Header';
import CardsRow from './CardsRow';
import EventsPanel from './EventsPanel';
import EmailsPanel from './EmailsPanel';
import TodoList from './TodoList';

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
