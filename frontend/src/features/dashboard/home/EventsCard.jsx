import './EventsCard.css';
import { FiCalendar } from 'react-icons/fi';

export default function EventsCard() {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-icon">
          <FiCalendar />
        </div>
        <h3>אירועים וסדנאות</h3>
      </div>

      <ul className="card-list">
        <li className="card-list-item">
          <span className="label">סדנת ניהול זמן</span>
          <span className="value">25/04/2025</span>
        </li>
        <li className="card-list-item">
          <span className="label">כנס יזמות אוניברסיטאי</span>
          <span className="value">01/05/2025</span>
        </li>
      </ul>

      <button className="card-button">לכל האירועים</button>
    </div>
  );
}
