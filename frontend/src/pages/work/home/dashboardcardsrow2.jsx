// dashboardcardsrow2.jsx
import './dashboardcardsrow.css';
import Reserve from './Reserve';
import TuitionCard from './TuitionCard';
import EventsCard from './EventsCard';

export default function DashboardCardsRow2() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-row">
        <Reserve />
        <TuitionCard />
        <EventsCard />
      </div>
    </div>
  );
}