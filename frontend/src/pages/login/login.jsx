import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/ani-loading-login.json';
import SuccessPopup from './Successpopup.jsx';
import loginMainAnimation from '../../assets/ani-main-login.json';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState(''); // ✅ new field
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, studentId }), // ✅ send ID too
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200 && data.status === 'success') {
        localStorage.setItem("username", username);
        setLoginSuccess(true);
        setMessage('✅ ההתחברות הצליחה!');
      } else if (response.status === 401) {
        setMessage('❌ שם משתמש או סיסמה שגויים');
      } else {
        setMessage('❌ משהו השתבש. נסה שוב מאוחר יותר.');
      }

    } catch (error) {
      setLoading(false);
      setMessage('❌ שגיאה בבקשה: ' + error.message);
      console.error('Login error:', error);
    }
  };

  const handleSuccessPopupClose = () => {
    setLoginSuccess(false);
    navigate('/work');
  };

  return (
    <div className="login-container" dir="rtl">
      <div className="form-section">
        <h2>בוא נתחיל</h2>
        <p>התחבר לדשבורד שלך ונהל את חייך האקדמיים במקום אחד.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="studentId">מספר תעודת זהות</label>
          <input
            type="text"
            id="studentId"
            placeholder="הכנס ת״ז"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <label htmlFor="username">שם משתמש</label>
          <input
            type="text"
            id="username"
            placeholder="הכנס שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">סיסמה</label>
          <input
            type="password"
            id="password"
            placeholder="הכנס סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" defaultChecked /> זכור אותי
            </label>
            <a href="#" className="forgot">שכחת סיסמה?</a>
          </div>

          <button type="submit" disabled={loading}>התחברות</button>
        </form>

        {loading && (
          <div className="lottie-animation">
            <Lottie
              options={{
                animationData,
                loop: true,
                autoplay: true,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={150}
              width={150}
            />
          </div>
        )}

        {message && <p className="login-message">{message}</p>}
      </div>

      {loginSuccess && <SuccessPopup onClose={handleSuccessPopupClose} />}

      <div className="image-section">
        <Lottie
          options={{
            animationData: loginMainAnimation,
            loop: true,
            autoplay: true,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={600}
          width={600}
        />
      </div>
    </div>
  );
}

export default Login;
