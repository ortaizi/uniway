import './Home.css';

function Home() {
  return (
    <div className="dashboard-home">
      <h2 className="dashboard-heading">ברוך הבא, זה הסיכום שלך להיום:</h2>

      <div className="cards-grid">
        <div className="dashboard-card">
          <h3>משימות פתוחות</h3>
          <p>יש לך 4 מטלות שעדיין לא הוגשו.</p>
          <button className="btn">לצפייה במטלות</button>
        </div>

        <div className="dashboard-card">
          <h3>מיילים שלא נקראו</h3>
          <p>3 הודעות חדשות מהאוניברסיטה.</p>
          <button className="btn">פתח מיילים</button>
        </div>

        <div className="dashboard-card">
          <h3>אירועים קרובים</h3>
          <p>אירוע אחד מחר בשעה 10:00.</p>
          <button className="btn">לכל האירועים</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
