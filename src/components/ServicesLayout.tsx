import React from 'react';
import { Outlet } from 'react-router-dom';

const ServicesLayout: React.FC = () => {
  return (
    <div>
      {/* You can add shared UI elements for all service pages here, like a sub-header or a sidebar. */}
      {/* The Outlet component will render the specific service page (index or detail). */}
      <Outlet />
    </div>
  );
};

export default ServicesLayout;