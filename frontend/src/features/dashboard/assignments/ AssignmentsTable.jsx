import React, { useEffect, useState } from 'react';
import { FaTrash, FaFilePdf } from 'react-icons/fa';

export default function AssignmentsTable() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (!username || !password) {
          console.error('No credentials found!');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/assignments/open`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }

        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <div className="loading-message">טוען מטלות פתוחות...</div>;
  }

  if (assignments.length === 0) {
    return <div className="empty-message">אין מטלות פתוחות 🎉</div>;
  }

  return (
    <div className="assignments-card">
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
                <span className="course-name">{a.course}</span>
              </td>
              <td>{a.due_date.replace(' ', '\n')}</td>
              <td>{a.days_left} ימים</td>
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
