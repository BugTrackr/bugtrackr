import React from 'react';
export default ({
  id,
  project_id,
  author,
  assigned_to,
  description,
  status,
  onClick,
}) => {
  return (
    <li onClick={onClick}>
      <div>{project_id}</div>
      <div>{author}</div>
      <div>{assigned_to}</div>
      <div>{description}</div>
      <div>{status}</div>
    </li>
  );
};
