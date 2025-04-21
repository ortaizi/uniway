// card.jsx
import './card.css';

export default function Card({ title, items, buttonText, onClick, icon }) {
  return (
    <div className="card-container">
      <div className="card-header">
        {icon && <div className="card-icon">{icon}</div>}
        <h3>{title}</h3>
      </div>
      <ul className="card-list">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <button className="card-button" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}
