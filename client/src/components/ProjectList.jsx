import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux'
import ProjectListItem from './ProjectListItem';
import { fetchProjects } from "../actions/project";

export const ProjectList = ({ projects, history, fetchProjects }) => {
  const mockItemList = [
    {
      projectName: 'Project 1',
      id: 1,
      activeBugs: 4,
    },
    {
      projectName: 'Project 2',
      id: 2,
      activeBugs: 2,
    },
  ];

  useEffect(() => {
    console.log('here')
    // fetchProjects();
  }, [projects]);

  const handleItemClick = (id) => {
    history.push(`/projects/${id}`);
  };

  return (
    <div>
      <ul>
        {mockItemList.map((item) => {
          return (
            <ProjectListItem
              {...item}
              key={`${item.projectName}`}
              onClick={() => handleItemClick(item.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProjects
}, dispatch);

export default connect(null, mapDispatchToProps)(ProjectList);