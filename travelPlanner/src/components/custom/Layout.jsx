import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      {/* Header is now inside the Router context because Layout is rendered by the Router */}
      <Header />
      {/* Outlet renders the child routes (App, CreateTrip, etc.) */}
      <Outlet />
    </>
  );
}

export default Layout;