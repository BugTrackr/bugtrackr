import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {isAuthenticated ? <Component {...props} /> : <Redirect to="/" />}
          </>
        );
      }}
    />
  );
};

const mapStateToProps = ({ user }) => {
  return {
    isAuthenticated: user.isAuthenticated,
    isFetching: user.isFetching,
    error: user.error,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
