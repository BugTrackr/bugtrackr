import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default (props) => {
  return (
    <div className="flex flex-col flex-none">
      <NavLink to="/projects" activeClassName="text-indigo-500">
        Projects
      </NavLink>
      <NavLink to="/bugs" activeClassName="text-indigo-500">
        Your assigned bugs
      </NavLink>
    </div>
  );
};
