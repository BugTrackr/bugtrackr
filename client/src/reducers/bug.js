import { ADD_BUG, SET_BUGS } from '../actionTypes/bugs';

const initialState = {
  bugs: [],
};

function bugReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BUG:
      return { ...state, bugs: [...state.bugs, action.payload] };
    case SET_BUGS:
      return { ...state, bugs: action.payload };

    default:
      return state;
  }
}

export default bugReducer;
