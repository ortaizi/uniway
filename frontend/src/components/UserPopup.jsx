import React, { useState, useEffect } from "react";
import "./UserPopup.css";
import Lottie from "react-lottie";
import { FiX } from "react-icons/fi"; // ✅ אייקון סגירה
import { useNavigate } from "react-router-dom"; // ✅ לשימוש ב־navigate
import animationData from "../../../assets/Animation-loading-userpopup.json";

function UserPopup({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [institution, setInstitution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ ניתוב לעמוד אחר

  useEffect(() => {
    const storage = localStorage.getItem("username") ? localStorage : sessionStorage;
    setUsername(storage.getItem("username") || "");
    setPassword(storage.getItem("password") || "");
    setStudentId(storage.getItem("studentId") || "");
    setInstitution(storage.getItem("institution") || "");
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, studentId, institution }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.status === 200 && data.status === "success") {
        const storage = localStorage.getItem("username") ? localStorage : sessionStorage;
        storage.setItem("username", username);
        storage.setItem("password", password);
        storage.setItem("studentId", studentId);
        storage.setItem("institution", institution);

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
    navigate("/", { replace: true }); // ✅ ניתוב מחדש עם איפוס היסטוריה
  };

  return (
    <div className="user-popup">
      <div className="user-popup-inner">
        {/* ❌ כפתור סגירה */}
        <button className="popup-close" onClick={onClose}>
          <FiX />
        </button>

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

        <label>מוסד לימודי</label>
        <select
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
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
