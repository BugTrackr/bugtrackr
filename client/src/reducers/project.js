const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_PROJECTS':
    return action.projects;
    case 'ADD_PROJECT':
    default:
      return state;
  }
}