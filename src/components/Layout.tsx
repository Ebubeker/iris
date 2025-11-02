import React from 'react';
import { Outlet } from 'react-router-dom';
import CookieBanner from './CookieBanner';

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <CookieBanner />
    </>
  );
};

export default Layout;

