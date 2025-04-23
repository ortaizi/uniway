import './bottomgridrow.css';
import Card from './card';
import QuickLinks from './QuickLinks';
import { FiCheckCircle, FiShield, FiDollarSign } from 'react-icons/fi';

export default function BottomGridRow() {
  const handleClick = () => alert('עוד מידע בדרך 😊');

  return (
    <div className="bottom-grid-wrapper">
      <div className="bottom-grid-row">
        {/* צד ימין – 3 כרטיסים */}
        <Card
          title="המשימות שלי"
          items={["לשלוח מייל למרצה", "להתכונן למצגת בסטטיסטיקה"]}
          buttonText="לרשימת משימות"
          onClick={handleClick}
          icon={<FiCheckCircle />}
        />
        <Card
          title="ימי מילואים קרובים"
          items={["26/04 – אימון מחלקה", "02/05 – שמירה בבסיס"]}
          buttonText="לפרטי מילואים"
          onClick={handleClick}
          icon={<FiShield />}
        />
        <Card
          title="מצב שכר חודשי"
          items={["שעות אושרו: 42", "שעות בתשלום: 40"]}
          buttonText="לפרטי שכר"
          onClick={handleClick}
          icon={<FiDollarSign />}
        />

        {/* צד שמאל – קישורים שימושיים */}
        <QuickLinks />
      </div>
    </div>
  );
}
