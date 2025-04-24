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
          items={[
            { label: "סיכום יחידה 1", value: "עד 22/04" },
            { label: "מיני-פרויקט", value: "עד 25/04" }
          ]}
          buttonText="לכל המטלות"
          onClick={() => navigate('/work/assignments')}
          icon={<FiClipboard />}
        />
        <Card
          title="ציונים שפורסמו"
          items={[
            { label: "מבוא לסטטיסטיקה", value: "87" },
            { label: "חקר ביצועים", value: "92" }
          ]}
          buttonText="לכל הציונים"
          onClick={() => navigate('/work/grades')}
          icon={<FiBarChart2 />}
        />
        <Card
          title="מבחנים ובחנים קרובים"
          items={[
            { label: "מיקרו כלכלה", value: "30/04" },
            { label: "SQL", value: "05/05" }
          ]}
          buttonText="לכל המבחנים"
          onClick={() => navigate('/work/exams')}
          icon={<FiCalendar />}
        />
      </div>
    </div>
  );
}
