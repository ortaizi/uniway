import React, { useState } from "react";
import "./FeedbackDropdown.css";
import { FiSend, FiX, FiMessageCircle } from "react-icons/fi";

export default function FeedbackDropdown({ onClose }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setTimeout(() => {
        setMessage("");
        setSent(false);
        onClose(); // סגור אוטומטית
      }, 1500);
    }
  };

  return (
    <div className="dropdown-style feedback-dropdown" dir="rtl">
      <div className="dropdown-header">
        <div className="quick-title">
          <FiMessageCircle className="quick-title-icon" />
          <span>יש לך רעיון או בעיה?</span>
        </div>
        <FiX className="close-icon" onClick={onClose} />
      </div>

      <p className="feedback-subtitle">
        נשמח לשמוע ממך על תקלה, פיצ׳ר חדש, או כל דבר אחר 🙌
      </p>

      <textarea
        className="feedback-textarea"
        placeholder="כתוב כאן את ההצעה או הבעיה שלך..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="feedback-send-btn" onClick={handleSend}>
        <FiSend className="send-icon" />
        שלח
      </button>

      {sent && <p className="feedback-sent-msg">ההודעה נשלחה בהצלחה 🎉</p>}
    </div>
  );
}
