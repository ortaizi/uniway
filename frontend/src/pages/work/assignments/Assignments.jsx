import React from 'react';
import './assignments.css';

import AssignmentsHeader from './AssignmentsHeader';
import AssignmentsTable from './AssignmentsTable';
import TodoList from './TodoList';

export default function Assignments() {
  return (
    <div className="inner-content-card">
      <AssignmentsHeader />
      <div className="assignments-content-grid">
        <AssignmentsTable />
        <TodoList />
      </div>
    </div>
  );
}
