import React from 'react';
import './dashboard.css';

//import Sidebar from './sidebar.jsx';
import Header from './home/header.jsx';
import CardsRow from './home/cardsrow.jsx';
import EventsPanel from './home/eventspanel.jsx';
import EmailsPanel from './home/emailspanel.jsx';
import TodoList from './home/todolist.jsx';

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
