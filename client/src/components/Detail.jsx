import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';

import ProjectDetail from '../components/ProjectDetail';
export default (props) => {
  return (
    <div>
      <Switch>
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/bugs/:id" component={() => <div>Bug Detail</div>} />
      </Switch>
    </div>
  );
};
