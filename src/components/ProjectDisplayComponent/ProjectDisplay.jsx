import React from 'react';

const ProjectDisplay = (props) => {
  return (
    <div>
      <h1>{props.project_name}</h1>
      <p>{props.project_creator}</p>
      <p>{props.company_name}</p>
    </div>
  );
}

export default ProjectDisplay;