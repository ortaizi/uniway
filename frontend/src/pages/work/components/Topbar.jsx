import React, { useState } from "react";
import "./Topbar.css";
import { FaRegCommentDots } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import UserPopup from "./UserPopup";

function Topbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className="topbar" dir="rtl">
      <div className="topbar-placeholder" />
      <div className="topbar-icons">
        <FaRegCommentDots className="topbar-icon chat-icon" /> {/* ✅ אייקון צ'אט עם עיצוב מותאם */}
        <FiUser className="topbar-icon" onClick={togglePopup} />
      </div>
      {isPopupOpen && <UserPopup onClose={togglePopup} />}
    </header>
  );
}

export default Topbar;
