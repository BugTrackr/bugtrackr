import React from 'react';

export default (props) => {
  const mockProjectDetailData = [
    {
      bugId: 321,
      description: 'a bug 1',
      status: 'status',
    },
    {
      bugId: 3212,
      description: 'a bug 2',
      status: 'status',
    },
    {
      bugId: 123,
      description: 'a bug 3',
      status: 'status',
    },
  ];
  return (
    <div className="container">
      <ul>
        {mockProjectDetailData.map((item) => {
          return (
            <li className="flex">
              <div>{item.bugId}</div>
              <div>{item.description}</div>
              <div>{item.status}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
