// BottomGridRow.jsx
import './bottomgridrow.css';
import TodoList from './TodoList';
import QuickLinks from './QuickLinks';

export default function BottomGridRow() {
  return (
    <div className="bottom-grid-wrapper">
      <div className="bottom-grid-row">
        {/* צד ימין – משימות */}
        <div className="card-container">
          <TodoList />
        </div>

        {/* צד שמאל – קישורים שימושיים */}
        <div className="card-container">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}
