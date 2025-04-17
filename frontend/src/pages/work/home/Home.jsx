import React from 'react';
import './Home.css';
import Header from './Header';
import CardsRow from './CardsRow';
import TodoList from './TodoList';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home() {
  return (
    <main className="dashboard-main">
      <Header />
      <CardsRow />

      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={30}
        isResizable={false}
        draggableHandle=".draggable"
      >
        <div key="todo" data-grid={{ x: 8, y: 0, w: 4, h: 10 }}>
          <TodoList />
        </div>
      </ResponsiveGridLayout>
    </main>
  );
}
