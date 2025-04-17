import React from 'react';
import './Assignments.css';
import { FaTrash, FaFilePdf } from 'react-icons/fa';

const assignments = [
  {
    title: "הגשת תרגיל 2",
    course: "מבוא לכלכלה לתעשייה וניהול",
    dueDate: "30/03/2025",
    dueTime: "18:00",
    daysLeft: "11 ימים 10 שעות",
  },
  {
    title: "תרגול בית 1 - עצי החלטה",
    course: "חקר ביצועים 2",
    dueDate: "2/04/2025",
    dueTime: "23:59",
    daysLeft: "8 ימים 16 שעות",
  },
  {
    title: "תרגול בית 1 - ניתוח אסימפטוטי",
    course: "יסודות האלגוריתמים והסיבוכיות",
    dueDate: "5/04/2025",
    dueTime: "23:55",
    daysLeft: "5 ימים 16 שעות",
  },
  {
    title: "הגשת תרגיל 3",
    course: "מבוא לכלכלה לתעשייה וניהול",
    dueDate: "6/04/2025",
    dueTime: "18:00",
    daysLeft: "4 ימים 10 שעות",
  },
  {
    title: "תרגול בית 2 - אלגוריתמי מיון",
    course: "יסודות האלגוריתמים והסיבוכיות",
    dueDate: "14/04/2025",
    dueTime: "23:55",
    daysLeft: "4 ימים 16 שעות",
  }
];

export default function Assignments() {
  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <h2 className="assignments-title">מטלות</h2>
        <p className="assignments-description">
          כאן תוכל לראות את כל המטלות הפתוחות שלך. <br />
          מסודר לפי תאריך ההגשה והזמן שנותר לביצוע.
        </p>
      </div>
      
      <table className="assignments-table">
        <thead>
          <tr>
            <th>מטלה</th>
            <th>תאריך הגשה</th>
            <th>ימים להגשה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={index}>
              <td>
                <strong>{a.title}</strong><br />
                <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>{a.course}</span>
              </td>
              <td>{a.dueDate} <br /> {a.dueTime}</td>
              <td>{a.daysLeft}</td>
              <td className="assignments-actions">
                <button className="assignment-button">הגשת מטלה</button>
                <FaTrash className="delete-icon" />
                <FaFilePdf className="pdf-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
