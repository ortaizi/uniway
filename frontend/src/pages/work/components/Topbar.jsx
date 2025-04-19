import React, { useState } from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import './Topbar.css';
import UserPopup from '../components/UserPopup'; // נתיב לקובץ popup החדש

export default function Topbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className="topbar">
      <div className="topbar-icons">
        <FiBell className="topbar-icon" />
        <FiUser className="topbar-icon" onClick={togglePopup} />
      </div>

      {isPopupOpen && (
        <UserPopup onClose={togglePopup} />
      )}
    </header>
  );
}
