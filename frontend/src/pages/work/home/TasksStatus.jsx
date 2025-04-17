import React from 'react';
import './TasksStatus.css';
import { FiArrowRightCircle } from 'react-icons/fi';

export default function TasksStatus() {
  const openTasks = 5; // ערך דינמי בעתיד

  return (
    <div className="tasks-card">
      <div className="tasks-content">
        <h2>מטלות להגשה</h2>
        <p>יש לך {openTasks} מטלות פתוחות להגשה</p>
        <button className="tasks-button">
          מעבר לכל המטלות <FiArrowRightCircle />
        </button>
      </div>
    </div>
  );
}
