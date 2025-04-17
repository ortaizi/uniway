import React, { useState } from 'react';
import './TodoList.css';
import { FiPlus } from 'react-icons/fi';

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'לשלוח מייל למרצה', completed: false },
    { id: 2, text: 'להתכונן למצגת בקורס סטטיסטיקה', completed: false },
  ]);

  const handleToggle = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

    setTimeout(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }, 800);
  };

  const handleAdd = () => {
    const text = prompt("הכנס משימה חדשה:");
    if (text) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false
      };
      setTasks([newTask, ...tasks]);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>המשימות שלי</h2>
        <button className="add-btn" onClick={handleAdd}>
          <FiPlus />
        </button>
      </div>
      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span>{task.text}</span>
            </label>
          </li>
        ))}
        {tasks.length === 0 && <p className="empty-text">אין משימות כרגע ✨</p>}
      </ul>
    </div>
  );
}
