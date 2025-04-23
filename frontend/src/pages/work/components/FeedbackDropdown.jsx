import React, { useState } from "react";
import "./FeedbackDropdown.css";
import { FiSend } from "react-icons/fi";

export default function FeedbackDropdown({ onClose }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      // פה אפשר להוסיף שליחה לשרת בעתיד
      setSent(true);
      setTimeout(() => {
        setMessage("");
        setSent(false);
        onClose(); // סגירה אוטומטית אחרי שליחה
      }, 1500);
    }
  };

  return (
    <div className="topbar-dropdown-position feedback-dropdown" dir="rtl">
      <h3 className="feedback-title">יש לך רעיון או בעיה?</h3>
      <p className="feedback-subtitle">
        נשמח לשמוע ממך על תקלה, פיצ׳ר חדש, או כל דבר אחר 🙌
      </p>
      <textarea
        placeholder="כתוב כאן את ההצעה או הבעיה שלך..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="feedback-textarea"
      />
      <button className="feedback-send-btn" onClick={handleSend}>
        <FiSend className="send-icon" />
        שלח
      </button>
      {sent && <p className="feedback-sent-msg">ההודעה נשלחה בהצלחה 🎉</p>}
    </div>
  );
}
