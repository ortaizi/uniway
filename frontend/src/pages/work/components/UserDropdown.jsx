import React, { useEffect, useState } from 'react';
import './UserDropdown.css'; // ניצור קובץ עיצוב נלווה

function UserDropdown({ onLogout }) {
  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storage = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
    setStudentId(storage.getItem('studentId') || '');
    setUsername(storage.getItem('username') || '');
    setPassword(storage.getItem('password') || '');
  }, []);

  const handleSave = () => {
    const storage = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
    storage.setItem('studentId', studentId);
    storage.setItem('username', username);
    storage.setItem('password', password);
    alert('הפרטים נשמרו בהצלחה!');
  };

  return (
    <div className="user-dropdown">
      <label>תעודת זהות</label>
      <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />

      <label>שם משתמש</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>סיסמה</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="save-btn" onClick={handleSave}>שמירת שינויים</button>
      <button className="logout-btn" onClick={onLogout}>התנתקות</button>
    </div>
  );
}

export default UserDropdown;
