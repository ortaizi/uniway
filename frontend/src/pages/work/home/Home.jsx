import React from 'react';
import './Home.css';

import Header from './Header';
import DashboardCardsRow from './dashboardcardsrow';
import DashboardCardsRow2 from './dashboardcardsrow2'; // ✅ חשוב! הייבוא החסר
import BottomGridRow from './BottomGridRow';           // ✅ גם אותו נוסיף

export default function Home() {
  return (
    <main className="dashboard-main">
      <Header />

      {/* ✅ שורת שלושת הכרטיסים העליונים */}
      <DashboardCardsRow />

      {/* ✅ שורת הכרטיסים השנייה (מיילים ואירועים) */}
      <DashboardCardsRow2 />

      {/* ✅ השורה התחתונה עם TodoList ו־QuickLinks */}
      <BottomGridRow />

      {/* 📊 בהמשך תוכל להוסיף גרפים / אינטגרציות נוספות כאן */}
    </main>
  );
}
