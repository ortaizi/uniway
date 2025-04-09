import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/ani-loading-login.json';
import SuccessPopup from './successpopup.jsx';
import loginMainAnimation from '../../assets/ani-main-login.json';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      if (!API_URL) {
        console.error("VITE_API_URL is not defined!");
      }
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.status === 200 && data.status === 'success') {
        setLoginSuccess(true);
        setMessage('✅ Login successful!');
      } else if (response.status === 401) {
        setMessage('❌ Invalid username or password');
      } else {
        setMessage('❌ Something went wrong. Please try again later.');
      }

    } catch (error) {
      setLoading(false);
      setMessage('❌ There was an error with the request: ' + error.message);
      console.error('Login error:', error);
    }
  };

  const handleSuccessPopupClose = () => {
    setLoginSuccess(false);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <h2>Let's Get Started</h2>
        <p>Log in to your student dashboard and manage your academic life in one place.</p>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#" className="forgot">Forgot Password?</a>
          </div>

          <button type="submit" disabled={loading}>Login</button>
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
