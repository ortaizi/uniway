// dashboardcardsrow2.jsx
import './dashboardcardsrow.css';
import Card from './card';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCalendar } from 'react-icons/fi';

export default function DashboardCardsRow2() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-row">
        <Card
          title="מיילים שלא נקראו"
          items={[
            'הזמנה לסדנת חדשנות – 20/04',
            'מייל מרצה: הנחיות לתרגול 3',
          ]}
          buttonText="לכל המיילים שלא נקראו"
          onClick={() => navigate('/work/emails')}
          icon={<FiMail />}
        />

        <Card
          title="אירועים, סדנאות והרצאות"
          items={[
            'סדנת קורות חיים – 23/04',
            'הרצאה: עיצוב חוויית משתמש – 26/04',
          ]}
          buttonText="לכל האירועים"
          onClick={() => navigate('/work/events')}
          icon={<FiCalendar />}
        />
      </div>
    </div>
  );
}
