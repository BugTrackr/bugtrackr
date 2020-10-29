import {
  FETCH_AUTHENTICATION,
  FETCH_AUTHENTICATION_SUCCESS,
  FETCH_AUTHENTICATION_FAILURE,
} from '../actionTypes/user';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  error: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHENTICATION:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.status,
        isFetching: false,
      };
    case FETCH_AUTHENTICATION_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default userReducer;
