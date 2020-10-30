export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects,
});

export const addProject = (project) => ({
  type: 'ADD_PROJECT',
  project,
});

export const deleteProject = (projectId) => ({
  type: 'DELETE_PROJECT',
  projectId,
});

export const fetchProjects = () => {
  return async (dispatch) => {
    const data = await fetch('/projects/getAllProjects')
    .then(response => response.json())
    
    console.log('Data', data);
  };
};
