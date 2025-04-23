import React from "react";
import "./MailDropdown.css";
import { FiX } from "react-icons/fi";

export default function MailDropdown({ onClose }) {
  const instructorMails = [
    {
      from: "Dr. Cohen (Intro to Stats)",
      subject: "Assignment 3 Submission Reminder",
      date: "20/04/2025",
    },
    {
      from: "TA - Microeconomics",
      subject: "Solution for Exercise 4",
      date: "18/04/2025",
    },
  ];

  const generalMails = [
    {
      from: "Student Affairs",
      subject: "Scholarship Update",
      date: "17/04/2025",
    },
    {
      from: "BGU Announcements",
      subject: "Passover Break Schedule",
      date: "15/04/2025",
    },
  ];

  return (
    <div className="mail-dropdown-page">
      <div className="dropdown-header">
        <div className="user-info">
          <div className="avatar">O</div>
          <div className="user-details">
            <span className="user-name">Or Taizi</span>
            <span className="user-email">ortaiz@post.bgu.ac.il</span>
          </div>
        </div>
        <FiX className="close-icon" onClick={onClose} />
      </div>

      <div className="mail-section">
        <h4 className="section-title">מרצים ומתרגלים</h4>
        <ul className="mail-list">
          {instructorMails.map((mail, index) => (
            <li key={index} className="mail-item">
              <strong>{mail.subject}</strong>
              <span>{mail.from}</span>
              <small>{mail.date}</small>
            </li>
          ))}
        </ul>
      </div>

      <div className="mail-section">
        <h4 className="section-title">כללי – אוניברסיטה</h4>
        <ul className="mail-list">
          {generalMails.map((mail, index) => (
            <li key={index} className="mail-item">
              <strong>{mail.subject}</strong>
              <span>{mail.from}</span>
              <small>{mail.date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
