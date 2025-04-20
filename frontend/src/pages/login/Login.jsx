import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import animationData from '../../assets/ani-loading-login.json';
import SuccessPopup from './Successpopup.jsx';
import loginMainAnimation from '../../assets/ani-main-login.json';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, studentId, institution }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200 && data.status === 'success') {
        const remember = document.querySelector('input[type="checkbox"]').checked;
        const storage = remember ? localStorage : sessionStorage;

        storage.setItem("username", username);
        storage.setItem("password", password);
        storage.setItem("studentId", studentId);
        storage.setItem("institution", institution);

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
        <div className="form-inner">
          <h2>אנחנו מתחברים – אתה מתפנה ללמוד.</h2>
          <p>
            תן לנו רגע לזהות אותך – ונחבר אותך בקליק לכל מערכות הלימוד שלך,
            <br /> ומכאן? אנחנו כבר על זה.
          </p>

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
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="הכנס סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="הצג/הסתר סיסמה"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            <label htmlFor="institution">בחר מוסד לימודי</label>
            <select
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            >
              <option value="">בחר מוסד</option>
              <option value="אוניברסיטת בן-גוריון">אוניברסיטת בן-גוריון</option>
              <option value="אוניברסיטת תל אביב">אוניברסיטת תל אביב</option>
              <option value="אוניברסיטה עברית">האוניברסיטה העברית</option>
              <option value="אוניברסיטת חיפה">אוניברסיטת חיפה</option>
              <option value="הטכניון">הטכניון</option>
              <option value="מכללת ספיר">מכללת ספיר</option>
              <option value="אוניברסיטת רייכמן">אוניברסיטת רייכמן</option>
            </select>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" defaultChecked />
                <span>זכור אותי</span>
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
