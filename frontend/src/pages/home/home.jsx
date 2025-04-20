import './home.css';
import logo from '../../assets/uniway-logo.png';
import lightbulb from '../../assets/lightbulb-rb.png';
import pencil from '../../assets/pencil-rb.png';
import target from '../../assets/target-rb.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" dir="rtl">
      <header className="home-topbar">
        <div className="home-topbar-content">
          <div className="home-topbar-brand">
            <span className="home-topbar-title">Uniway</span>
            <img src={logo} alt="לוגו יוניוויי" className="home-topbar-logo" />
          </div>
          <a href="#about" className="home-topbar-link">מי אנחנו</a>
          <a href="#reviews" className="home-topbar-link">מה מספרים עלינו</a>
        </div>
      </header>

      <section className="home-main">
        <h1 className="home-main-title">כל מה שסטודנט צריך – במקום אחד</h1>
        <p className="home-main-description">
          Uniway היא הפלטפורמה החכמה הראשונה מסוגה,<br />
          שמחוברת לכל מערכות הלימודים השונות ומנגישה את המידע לסטודנטים<br />
          בצורה פשוטה, נוחה וברורה – כדי שתוכלו להתמקד רק במה שחשוב באמת: ללמוד.
        </p>

        <div className="home-features">
          <div className="home-feature">
            <img src={lightbulb} className="home-icon" alt="עוזר אישי" />
            <h3>עוזר אישי</h3>
            <p>
              צ׳אט חכם שמבין שפה טבעית, יודע לשלוף כל קובץ שתבקש – סילבוסים, מטלות, הרצאות – וגם לשלוף מידע חשוב כמו מיילים של מרצים, הוראות הגשה ועוד.
            </p>
          </div>
          <div className="home-feature">
            <img src={pencil} className="home-icon" alt="מעקב אקדמי" />
            <h3>מעקב אקדמי</h3>
            <p>
              מעקב מותאם אישית אחר מטלות, ציונים, סטטוס הגשות, מיילים חשובים ומערכת השעות שלך – הכל במקום אחד, ברור ונוח.
            </p>
          </div>
          <div className="home-feature">
            <img src={target} className="home-icon" alt="אירועים בקמפוס" />
            <h3>אירועי קמפוס</h3>
            <p>
              ברגע שיוצא אירוע – הוא מתעדכן אצלך מיד בדף ייעודי. ניתן גם לסמן תחומי עניין ולקבל רק את מה שמעניין אותך: ספורט, יזמות, הופעות, גיוסים ועוד.
            </p>
          </div>
        </div>

        <div className="home-button-container">
          <button className="home-cta-button" onClick={() => navigate('/login')}>
            בואו נתחיל
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
