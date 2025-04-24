// Reserve.jsx
import './Reserve.css';
import { FiShield } from 'react-icons/fi';

export default function Reserve() {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-icon">
          <FiShield />
        </div>
        <h3>ימי מילואים</h3>
      </div>

      <ul className="card-list">
        <li className="card-list-item">
          <span className="label">מס׳ ימים מתחילת שנה</span>
          <span className="value">12</span>
        </li>
        <li className="card-list-item">
          <span className="label">קבוצה</span>
          <span className="value">5</span>
        </li>
      </ul>

      <button className="card-button">לפרטים האקדמיים</button>
    </div>
  );
}
