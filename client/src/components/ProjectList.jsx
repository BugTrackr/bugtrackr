import React from 'react';
import ProjectListItem from './ProjectListItem';

export default ({ projects, history }) => {
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

  const handleItemClick = (id) => {
    console.log('CLICKED');
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
