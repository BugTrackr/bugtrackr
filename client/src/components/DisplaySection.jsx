import React from 'react';
import { useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import ProjectList from './ProjectList';
import BugsList from './BugsList';

export default () => {
  const { path, url } = useRouteMatch();
  console.log('path', path);
  console.log('url', url);
  return (
    <div>
      <div>This is the display section</div>
      <Switch>
        <Route
          path="/projects"
          render={(props) => <ProjectList {...props} />}
        />
        <Route
          path="/bugs"
          render={(props) => (
            <div>
              <h2>Bug List</h2>
              <BugsList {...props} />
            </div>
          )}
        />
      </Switch>
    </div>
  );
};
