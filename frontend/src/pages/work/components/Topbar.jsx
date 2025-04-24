import React, { useState } from 'react';
import './Topbar.css';
import { FaRegCommentDots } from 'react-icons/fa';
import { FiUser, FiMail, FiLink } from 'react-icons/fi';
import UserPopup        from './UserPopup';
import MailDropdown     from './MailDropdown';
import LinksDropdown    from './LinksDropdown';
import FeedbackDropdown from './FeedbackDropdown';

export default function Topbar() {
  /* מצבי-תצוגה */
  const [popup,   setPopup]   = useState(false);
  const [mail,    setMail]    = useState(false);
  const [links,   setLinks]   = useState(false);
  const [fb,      setFb]      = useState(false);

  /* פונקציות החלפה */
  const togglePopup    = () => setPopup(!popup);
  const toggleMail     = () => { setMail(!mail);  setLinks(false); setFb(false); };
  const toggleLinks    = () => { setLinks(!links); setMail(false); setFb(false); };
  const toggleFeedback = () => { setFb(!fb);       setMail(false); setLinks(false); };

  return (
    <header className="topbar" dir="rtl">
      <div className="topbar-placeholder" />   {/* רק כדי לשמור על מרווח משמאל */}
      <div className="topbar-icons">

        {/* Feedback */}
        <div className="topbar-icon-wrapper">
          <FaRegCommentDots className="topbar-icon" onClick={toggleFeedback} />
        </div>

        {/* Mail */}
        <div className="topbar-icon-wrapper">
          <FiMail className="topbar-icon" onClick={toggleMail} />
        </div>

        {/* Quick-links */}
        <div className="topbar-icon-wrapper">
          <FiLink className="topbar-icon" onClick={toggleLinks} />
        </div>

        {/* User */}
        <div className="topbar-icon-wrapper">
          <FiUser className="topbar-icon" onClick={togglePopup} />
        </div>
      </div>

      {/* ------ Dropdowns: עטיפה אחת קובעת מיקום ------ */}
      {fb    && (
        <div className="topbar-dropdown-position dropdown-pos-fb">
          <FeedbackDropdown onClose={toggleFeedback} />
        </div>
      )}
      {mail  && (
        <div className="topbar-dropdown-position dropdown-pos-mail">
          <MailDropdown />
        </div>
      )}
      {links && (
        <div className="topbar-dropdown-position dropdown-pos-links">
          <LinksDropdown />
        </div>
      )}

      {popup && <UserPopup onClose={togglePopup} />}
    </header>
  );
}
