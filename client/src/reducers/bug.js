import { ADD_BUG, SET_BUGS, GET_PROJECTS } from '../actionTypes/bugs';
import { setBugs, addBug, getProjects } from '../actions/bugs';

const initialState = {
  bugList: [],
  projectList: [],
};

function bugReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BUG:
      return { ...state, bugList: [...state.bugs, action.payload] };
    case SET_BUGS:
      return { ...state, bugList: action.payload };
    case GET_PROJECTS:
      return { ...state, projectList: action.payload };
    default:
      return state;
  }
}

export const loadBugsList = () => {
  return (dispatch, getState) => {
    return fetch(`/users/getAssignedBugs/1`)
      .then((response) => response.json())
      .then((data) => {
        return dispatch(setBugs(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};

//getAllProjects will also parse users
export const getAllProjects = () => {
  return (dispatch, getState) => {
    return fetch(`/projects/getAllProjects`)
      .then((response) => response.json())
      .then((data) => {
        console.log('DDD', data);
        return dispatch(getProjects(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};

export const createBug = (values) => {
  console.log('from createBug:', values);
  const bugs = getState().bugs;
  return (dispatch, getState) => {
    return fetch(`/bugs/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(bug),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('from createBug data on success:', values);
        return dispatch(addBug(data));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
};

export default bugReducer;
