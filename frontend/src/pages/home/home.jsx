import './home.css';
import logo from '../../assets/uniway-logo.png';
import lightbulb from '../../assets/lightbulb-rb.png';
import pencil from '../../assets/pencil-rb.png';
import target from '../../assets/target-rb.png';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <div className="logo-title-block">
          <img src={logo} alt="Uniway Logo" className="logo-img" />
          <h1 className="logo-text">
            <span className="bold-part">Uni</span>
            <span className="light-part">way</span>
          </h1>
        </div>
        <p className="slogan">Uni-Life. Simplified.</p>
      </header>

      <section className="main">
        <h2>Everything You Need in One Platform</h2>
        <div className="features">
          <div className="feature">
            <img src={lightbulb} className="icon" alt="AI Assistant" />
            <h3>AI Chat Assistant</h3>
            <p>Your smart study companion, 24/7.</p>
          </div>
          <div className="feature">
            <img src={pencil} className="icon" alt="Academic Tracker" />
            <h3>Academic Tracker</h3>
            <p>Track your schedule, assignments, and deadlines in one place.</p>
          </div>
          <div className="feature">
            <img src={target} className="icon" alt="Events Tracker" />
            <h3>University Events</h3>
            <p>Never miss a campus event again.</p>
          </div>
        </div>

        <div className="button-container">
          <button className="cta-button" onClick={() => navigate('/login')}>
            Let's Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
