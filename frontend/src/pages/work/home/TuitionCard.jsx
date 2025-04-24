import './TuitionCard.css';
import { FiCreditCard } from 'react-icons/fi';

export default function TuitionCard() {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-icon">
          <FiCreditCard />
        </div>
        <h3>שכר לימודי</h3>
      </div>

      <ul className="card-list">
        <li className="card-list-item">
          <span className="label">יתרה לתשלום</span>
          <span className="value">₪4,250</span>
        </li>
        <li className="card-list-item">
          <span className="label">לתשלום עד</span>
          <span className="value">30/04/2025</span>
        </li>
      </ul>

      <button className="card-button">לצפייה בפירוט</button>
    </div>
  );
}