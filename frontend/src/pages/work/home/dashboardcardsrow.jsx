// dashboardcardsrow.jsx
import './dashboardcardsrow.css';
import Card from './card';
import { useNavigate } from 'react-router-dom';
import { FiClipboard, FiBarChart2, FiCalendar } from 'react-icons/fi';

export default function DashboardCardsRow() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-row">
        <Card
          title="מטלות להגשה"
          items={["סיכום יחידה 1 – עד 22/04", "מיני-פרויקט – עד 25/04"]}
          buttonText="לכל המטלות"
          onClick={() => navigate('/work/assignments')}
          icon={<FiClipboard />}
        />
        <Card
          title="ציונים שפורסמו"
          items={["מבוא לסטטיסטיקה: 87", "חקר ביצועים: 92"]}
          buttonText="לכל הציונים"
          onClick={() => navigate('/work/grades')}
          icon={<FiBarChart2 />}
        />
        <Card
          title="מבחנים ובחנים קרובים"
          items={["מיקרו כלכלה – 30/04", "SQL – 05/05"]}
          buttonText="לכל המבחנים"
          onClick={() => navigate('/work/exams')}
          icon={<FiCalendar />}
        />
      </div>
    </div>
  );
}
