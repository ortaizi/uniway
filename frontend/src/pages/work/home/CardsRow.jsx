import React from 'react';
import './CardsRow.css';

export default function CardsRow() {
  return (
    <div className="cards-row">
      <div className="status-card">
        <h2>מטלות להגשה</h2>
        <p>4 פתוחות</p>
        <button onClick={() => window.location.href = '/work/assignments'}>
          לכל המטלות
        </button>
      </div>

      <div className="status-card">
        <h2>אירועים קרובים</h2>
        <p>2 אירועים קרובים</p>
        <button>
          לצפייה ביומן
        </button>
      </div>

      <div className="status-card">
        <h2>מיילים שלא נקראו</h2>
        <p>6 מיילים חדשים</p>
        <button>
          סכם לי
        </button>
      </div>
    </div>
  );
}
