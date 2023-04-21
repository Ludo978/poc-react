import React from 'react';

import Sidebar from '../components/Sidebar/Sidebar';

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="app">
      <Sidebar />
      <div className="content main-content-card">
        { children }
      </div>
    </div>
  );
}
