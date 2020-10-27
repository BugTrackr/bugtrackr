import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logIn } from '../actions/user';

const Login = ({ logIn }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logIn,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
