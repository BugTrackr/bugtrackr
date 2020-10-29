import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logIn } from '../actions/user';

const Login = ({ logIn, history }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    logIn().then(() => {
      history.push('/projects');
    });
  };

  return (
    <div className="container w-full mx-auto p-20">
      <form
        onSubmit={handleSubmit}
        className="h-64 w-1/2 mx-auto my-20 flex flex-col"
      >
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required className="w-full" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required className="w-full" />
        <button type="submit" className="block w-1/4 mx-auto bg-gray-500">
          Login
        </button>
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
