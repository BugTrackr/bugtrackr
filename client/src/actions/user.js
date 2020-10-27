import {
  FETCH_AUTHENTICATION,
  FETCH_AUTHENTICATION_FAILURE,
  FETCH_AUTHENTICATION_SUCCESS,
} from '../actionTypes/user';
// add axios or maybe just use fetch.

export const setAuthenticationSuccess = () => ({
  type: FETCH_AUTHENTICATION_SUCCESS,
});

export const setFetching = () => ({
  type: FETCH_AUTHENTICATION,
});

export const setError = (error) => ({
  type: FETCH_AUTHENTICATION_FAILURE,
  error,
});

export const logIn = () => {
  return (dispatch) => {
    // send a request and then dispatch actions
    dispatch(setFetching());
    // simulation
    setTimeout(() => {
      dispatch(setAuthenticationSuccess());
    }, 2000);
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(setFetching);
    // simulation
    setTimeout(() => {
      dispatch(setAuthenticationSuccess());
    }, 2000);
  };
};
