import React, { useEffect } from 'react';
import { usePageData } from '../../context/pageData';
import { Container } from 'semantic-ui-react';
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
    <Container>
      <h1>PROJECT PAGE</h1>
      <div>{mapData(projectData)}</div>
    </Container>
  );
}

export default ProjectPage;