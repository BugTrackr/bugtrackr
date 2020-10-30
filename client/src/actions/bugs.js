import { ADD_BUG, SET_BUGS } from '../actionTypes/bugs';

export const addBug = (bug) => ({
  type: ADD_BUG,
  payload: bug,
});

export const setBugs = (bugs) => ({
  type: SET_BUGS,
  payload: bugs,
});
