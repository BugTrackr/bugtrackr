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
    <div className="w-full min-h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="h-auto w-1/2 flex flex-col shadow-lg p-3 rounded-md"
      >
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required className="w-full bg-gray-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline focus:border-solid focus:border-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required className="w-full bg-gray-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline focus:border-solid focus:border-2" />
        </div>
        <button type="submit" className="block w-1/4 mx-auto bg-indigo-500 rounded-sm p-2 shadow-lg text-white transform hover:scale-105 transition duration-300 ease-in">
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
