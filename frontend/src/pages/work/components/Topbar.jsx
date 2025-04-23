import React, { useState, useRef } from "react";
import "./Topbar.css";
import { FaRegCommentDots } from "react-icons/fa";
import { FiUser, FiMail, FiLink } from "react-icons/fi";
import UserPopup from "./UserPopup";
import MailDropdown from "./MailDropdown";
import LinksDropdown from "./LinksDropdown";
import FeedbackDropdown from "./FeedbackDropdown";

function Topbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showMailDropdown, setShowMailDropdown] = useState(false);
  const [showLinksDropdown, setShowLinksDropdown] = useState(false);
  const [showFeedbackDropdown, setShowFeedbackDropdown] = useState(false);

  const userRef = useRef(null);
  const mailRef = useRef(null);
  const linksRef = useRef(null);
  const feedbackRef = useRef(null);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const toggleMail = () => {
    setShowMailDropdown(!showMailDropdown);
    setShowLinksDropdown(false);
    setShowFeedbackDropdown(false);
  };
  const toggleLinks = () => {
    setShowLinksDropdown(!showLinksDropdown);
    setShowMailDropdown(false);
    setShowFeedbackDropdown(false);
  };
  const toggleFeedback = () => {
    setShowFeedbackDropdown(!showFeedbackDropdown);
    setShowMailDropdown(false);
    setShowLinksDropdown(false);
  };

  return (
    <header className="topbar" dir="rtl">
      <div className="topbar-placeholder" />
      <div className="topbar-icons">
        <div className="topbar-icon-wrapper" ref={feedbackRef}>
          <FaRegCommentDots className="topbar-icon" onClick={toggleFeedback} />
          {showFeedbackDropdown && (
            <div className="topbar-dropdown-position">
              <FeedbackDropdown />
            </div>
          )}
        </div>

        <div className="topbar-icon-wrapper" ref={mailRef}>
          <FiMail className="topbar-icon" onClick={toggleMail} />
          {showMailDropdown && (
            <div className="topbar-dropdown-position">
              <MailDropdown />
            </div>
          )}
        </div>

        <div className="topbar-icon-wrapper" ref={linksRef}>
          <FiLink className="topbar-icon" onClick={toggleLinks} />
          {showLinksDropdown && (
            <div className="topbar-dropdown-position">
              <LinksDropdown />
            </div>
          )}
        </div>

        <div className="topbar-icon-wrapper" ref={userRef}>
          <FiUser className="topbar-icon" onClick={togglePopup} />
        </div>
      </div>

      {isPopupOpen && <UserPopup onClose={togglePopup} />}
    </header>
  );
}

export default Topbar;
