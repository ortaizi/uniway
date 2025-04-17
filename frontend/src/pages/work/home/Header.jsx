import React from 'react';
import './Home.css';

export default function Header() {
  const username = 'אור'; // בעתיד – יגיע מהשרת או Context

  return (
    <div className="home-header">
      <h1>שלום, {username} 👋</h1>
      <p>ברוך הבא למרכז הלימודים שלך. כאן תוכל לעקוב אחרי מטלות, אירועים ומיילים חשובים.</p>
    </div>
  );
}
