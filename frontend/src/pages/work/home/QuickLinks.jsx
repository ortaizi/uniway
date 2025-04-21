// QuickLinks.jsx
import './QuickLinks.css';
import {
  FiGlobe,
  FiUser,
  FiShield,
  FiBookOpen,
  FiEdit3,
  FiCalendar,
} from 'react-icons/fi';

export default function QuickLinks() {
  const links = [
    {
      name: 'מודל',
      url: 'https://moodle.bgu.ac.il/moodle/login/index.php',
      icon: <FiBookOpen />,
      description: 'הרצאות, מטלות וכל מה שביניהם',
    },
    {
      name: 'פורטל',
      url: 'https://portal.bgu.ac.il/public/login?returnUrl=private%2Fhome',
      icon: <FiUser />,
      description: 'הפורטל האישי שלך באוניברסיטה',
    },
    {
      name: 'חרבות ברזל',
      url: 'https://bgu4u22.bgu.ac.il/apex/f?p=2004:101',
      icon: <FiShield />,
      description: 'מערכת למשרתי מילואים בחרבות ברזל',
    },
    {
      name: 'מנהל תלמידים',
      url: 'https://bgu4u22.bgu.ac.il/apex/10g/r/f_login1004/login_desktop?p_lang=he',
      icon: <FiUser />,
      description: 'שירותי מידע כלליים לסטודנטים',
    },
    {
      name: 'הרשמה לקורסים',
      url: 'https://bgu4u.bgu.ac.il/pls/scwp/!app.gate?app=cns',
      icon: <FiEdit3 />,
      description: 'בחירת קורסים וסידור מערכת',
    },
    {
      name: 'גזר – לוח בחינות',
      url: 'https://gezer1.bgu.ac.il/meser/main.php',
      icon: <FiCalendar />,
      description: 'בדיקת מועדי בחינות',
    },
  ];

  return (
    <div className="quick-links-grid">
      <h3 className="quick-title">קישורים מהירים</h3>
      <div className="quick-grid">
        {links.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noreferrer" className="quick-link">
            <div className="quick-icon">{link.icon}</div>
            <div className="quick-texts">
              <span className="quick-name">{link.name}</span>
              <span className="quick-desc">{link.description}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

