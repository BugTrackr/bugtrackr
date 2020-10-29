import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PrivateRoute from '../HOC/PrivateRoute';
import { logOut } from '../actions/user.js';

const TopNav = ({ logOut, ...props }) => {
  return (
    <Route
      to="/"
      render={(props) => {
        return (
          <div>
            <div>Brand</div>
            <PrivateRoute
              {...props}
              component={(props) => {
                return <button onClick={() => logOut()}>Logout</button>;
              }}
            />
          </div>
        );
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logOut,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TopNav);
