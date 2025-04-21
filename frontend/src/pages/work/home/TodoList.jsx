import React, { useState } from 'react';
import './TodoList.css';
import { FiPlus, FiCheckCircle } from 'react-icons/fi';

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'לשלוח מייל למרצה', completed: false },
    { id: 2, text: 'להתכונן למצגת בקורס סטטיסטיקה', completed: false },
  ]);

  const handleToggle = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

    // מחיקה איטית אחרי סימון
    setTimeout(() => {
      setTasks(prev => prev.filter(task => task.id !== id));
    }, 800);
  };

  const handleAdd = () => {
    const text = prompt('הכנס משימה חדשה:');
    if (text && text.trim()) {
      const newTask = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      };
      setTasks([newTask, ...tasks]);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="todo-title">
          <FiCheckCircle className="todo-icon" />
          <h3>המשימות שלי</h3>
        </div>
        <button className="add-btn" onClick={handleAdd} title="הוסף משימה">
          <FiPlus />
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`todo-item ${task.completed ? 'completed' : ''}`}
          >
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
        {tasks.length === 0 && (
          <p className="empty-text">אין משימות כרגע ✨</p>
        )}
      </ul>
    </div>
  );
}
