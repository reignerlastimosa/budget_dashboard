import React, { useEffect, useState } from 'react';

const Header = ({ dark, showComponent, setShowComponent, dashboardValues }) => {
  const [dashboardName, setDashboardName] = useState('');

  useEffect(() => {
    if (dashboardValues) {
      try {
        const parsedDashboardValues = JSON.parse(dashboardValues);
        setDashboardName(parsedDashboardValues.dashboard_name);
      } catch (error) {
        console.error(error);
      }
    }
  }, [dashboardValues]);

  return (
    <div className={!dark ? 'flex justify-between px-4 pt-4' : 'flex justify-between px-4 pt-4 text-white'}>
      <h2>Dashboard</h2>
      <h2 className="cursor-pointer" onClick={() => setShowComponent(!showComponent)}>Hello, {dashboardName}</h2>
    </div>
  );
};

export default Header;
