import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Layout from './Layout';
import Content from './Content';
import Detail from './Detail';
import TopNav from './TopNav';
import PrivateRoute from '../HOC/PrivateRoute';
import Login from './Login';
import configureStore from '../stores/index';

const store = configureStore();
const history = createBrowserHistory();

export default (props) => {
  return (
    <Layout>
      <Provider store={store}>
        <Router history={history}>
          <TopNav />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/login" />}
            ></Route>
            <Route path="/login" component={Login} />
            <PrivateRoute
              exact
              path={['/projects', '/bugs']}
              component={Content}
            />
            <PrivateRoute
              path={['/projects/:id', '/bugs/:id']}
              component={Detail}
            />
          </Switch>
        </Router>
      </Provider>
    </Layout>
  );
};
