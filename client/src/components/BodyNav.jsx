import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <NavLink to="/projects" activeClassName="text-blue-500">
        Projects
      </NavLink>
      <NavLink to="/bugs" activeClassName="text-blue-500">
        Your assigned bugs
      </NavLink>
    </div>
  );
};
