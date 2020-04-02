import React, { useEffect } from 'react';
import { usePageData } from '../../context/pageData';
import axios from 'axios';

const ProjectPage = () => {
  const { mapData, projectData, setProjectData } = usePageData();

  useEffect(() => {
    axios.get("/projects")
    .then(response => {
      setProjectData(response);
    })
  }, [setProjectData])

  return (
    <div>
      <h1>PROJECT PAGE</h1>
      <div>{mapData(projectData)}</div>
    </div>
  );
}

export default ProjectPage;