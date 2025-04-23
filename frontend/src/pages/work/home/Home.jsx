import React from 'react';
import './Home.css';

import Header from './Header';
import DashboardCardsRow from './dashboardcardsrow';
import DashboardCardsRow2 from './dashboardcardsrow2';
import BottomGridRow from './BottomGridRow';

export default function Home() {
  return (
    <div className="dashboard-home">
      <Header />
      <DashboardCardsRow />
      <DashboardCardsRow2 />
      <BottomGridRow />
    </div>
  );
}
