import React, { useState } from "react";
import "./Topbar.css";
import { FiBell, FiUser } from "react-icons/fi";
import UserPopup from "./UserPopup";


function Topbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className="topbar" dir="rtl">
      <div className="topbar-icons">
        <FiBell className="topbar-icon" />
        <FiUser className="topbar-icon" onClick={togglePopup} />
      </div>
      <div className="topbar-placeholder" />
      {isPopupOpen && <UserPopup onClose={togglePopup} />}
    </header>
  );
}

export default Topbar;
