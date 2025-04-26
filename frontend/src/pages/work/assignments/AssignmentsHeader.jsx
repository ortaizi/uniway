import React from 'react';
import './assignments.css';
export default function AssignmentsHeader() {
  return (
    <div className="assignments-header">
      <h2 className="assignments-title">מטלות</h2>
      <p className="assignments-description">
        כאן תוכל לראות את כל המטלות הפתוחות שלך.<br />
        מסודר לפי תאריך ההגשה והזמן שנותר לביצוע.
      </p>
    </div>
  );
}
