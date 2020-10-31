import { ADD_BUG, SET_BUGS, GET_PROJECTS } from '../actionTypes/bugs';

export const addBug = (bug) => ({
  type: ADD_BUG,
  payload: bug,
});

export const setBugs = (bugList) => ({
  type: SET_BUGS,
  payload: bugList,
});

export const getProjects = (allProjects) => ({
  type: GET_PROJECTS,
  payload: allProjects,
});
