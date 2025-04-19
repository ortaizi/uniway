import React, { useState, useEffect } from "react";
import "./UserPopup.css";
import Lottie from "react-lottie";
import animationData from "../../../assets/Animation-loading-userpopup.json";

function UserPopup({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // קריאה לפרטים השמורים
  useEffect(() => {
    const savedUsername =
      localStorage.getItem("username") || sessionStorage.getItem("username");
    const savedPassword =
      localStorage.getItem("password") || sessionStorage.getItem("password");
    const savedStudentId =
      localStorage.getItem("studentId") || sessionStorage.getItem("studentId");

    if (savedUsername) setUsername(savedUsername);
    if (savedPassword) setPassword(savedPassword);
    if (savedStudentId) setStudentId(savedStudentId);
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, studentId }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.status === 200 && data.status === "success") {
        // האם המשתמש בחר "זכור אותי"?
        const rememberMe =
          localStorage.getItem("username") !== null;

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("username", username);
        storage.setItem("password", password);
        storage.setItem("studentId", studentId);

        setMessage("✅ הפרטים עודכנו בהצלחה וההתחברות הצליחה.");
      } else {
        setMessage("❌ ההתחברות נכשלה. נא לבדוק את הפרטים.");
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("❌ שגיאה בלתי צפויה. נסה שוב.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  };

  return (
    <div className="user-popup">
      <div className="user-popup-inner">
        <h2>הפרטים שלי</h2>

        <label>תעודת זהות</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <label>שם משתמש</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>סיסמה</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLoading ? (
          <div className="popup-loader">
            <Lottie
              options={{
                animationData,
                loop: true,
                autoplay: true,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={100}
              width={100}
            />
          </div>
        ) : (
          <>
            <button className="save-button" onClick={handleSave}>
              שמירת שינויים
            </button>
            <button className="logout-button" onClick={handleLogout}>
              התנתקות
            </button>
          </>
        )}

        {message && <p className="popup-message">{message}</p>}
      </div>
    </div>
  );
}

export default UserPopup;
