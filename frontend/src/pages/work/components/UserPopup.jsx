import React, { useEffect, useState } from 'react';
import './UserPopup.css';
import Lottie from 'react-lottie';
import animationData from '../../assets/Animation-loading-userpopup.json';

function UserPopup({ onClose }) {
  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storage = localStorage.getItem("rememberMe") === "true" ? localStorage : sessionStorage;
    setStudentId(storage.getItem("studentId") || '');
    setUsername(storage.getItem("username") || '');
    setPassword(storage.getItem("password") || '');
  }, []);

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, studentId }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200 && data.status === 'success') {
        const storage = localStorage.getItem("rememberMe") === "true" ? localStorage : sessionStorage;
        storage.setItem("studentId", studentId);
        storage.setItem("username", username);
        storage.setItem("password", password);
        setMessage('✅ ההתחברות עודכנה בהצלחה');
      } else {
        setMessage('❌ ההתחברות נכשלה. אנא בדוק את הפרטים');
      }
    } catch (error) {
      setLoading(false);
      setMessage('❌ שגיאה בתהליך ההתחברות');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="user-popup-overlay" onClick={onClose}>
      <div className="user-popup" onClick={(e) => e.stopPropagation()}>
        <h2>הפרטים שלי</h2>

        <label>תעודת זהות</label>
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />

        <label>שם משתמש</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>סיסמה</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="save-btn" onClick={handleSaveChanges} disabled={loading}>שמירת שינויים</button>
        <button className="logout-btn" onClick={handleLogout}>התנתקות</button>

        {loading && (
          <div className="lottie-box">
            <Lottie
              options={{
                animationData,
                loop: true,
                autoplay: true,
                rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
              }}
              height={80}
              width={80}
            />
          </div>
        )}

        {message && <p className="popup-message">{message}</p>}
      </div>
    </div>
  );
}

export default UserPopup;
