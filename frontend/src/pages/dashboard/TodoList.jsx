import React from 'react';

export default function TodoList() {
  return (
    <section className="todo-list">
      <h2>משימות פתוחות</h2>
      <ul>
        <li><input type="checkbox" /> להגיש מטלה בקורס תכנות</li>
        <li><input type="checkbox" /> לסכם שיעור 4 במיקרו</li>
        <li><input type="checkbox" /> לקבוע פגישה עם מתרגלת</li>
      </ul>
    </section>
  );
}
