import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { usePageData } from '../../context/pageData';
import { Container, Table } from 'semantic-ui-react';
import { useAuth } from "../../context/auth";
import { isEmpty } from "lodash";
import axios from 'axios';

let freqObj = {};

const ProjectPage = () => {
  const { userData, setUserData, projectData, setProjectData, referrer, setReferrer } = usePageData();
  const { authTokens } = useAuth();
  setReferrer(-1);

  useEffect(() => {
    if (isEmpty(userData)){
      axios.post("/users/dashboard", { data: authTokens })
      .then(response => {
        setUserData(response);
      });
    }
    if (userData.data){
      let bugsArr = userData.data.bugs;
      for (let i of bugsArr){
        if (!freqObj[i.project.id]){
          freqObj[i.project.id] = 1;
          setProjectData(projectData => projectData.concat(i.project));
        }
      }
    }
  }, [authTokens, userData, setUserData, setProjectData, referrer]);

  const handleClick = (id) => {
    setReferrer(id);
  }

  const mapHeaders = (headers) => {
    if (!headers) { return false };
    return headers.map(header => {
      return (
        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
      )
    })
  }

  const mapProjects = (projects) => {
    if (projects.length === 0) { return false };
    
    return projects.map(project => {
      return (
        <Table.Row key={project.id}>
          <Table.Cell onClick={() => handleClick(project.id)}>{project.name}</Table.Cell>
          <Table.Cell>{`${project.project_creator.first_name} ${project.project_creator.last_name}`}</Table.Cell>
          <Table.Cell>{project.project_status.status}</Table.Cell>
          <Table.Cell>{project.created_at.split("T")[0]}</Table.Cell>
          <Table.Cell>{project.due_date === null ? "-" : project.due_date.split("T")[0]}</Table.Cell>
        </Table.Row>
      )
    })
  }

  if (referrer > -1) {
    return <Redirect to={`/projects/${referrer}`}/>
  }

  return (
    <Container>
      <h1>PROJECT PAGE</h1>
      <Table celled inverted selectable sortable>
        <Table.Header>
          <Table.Row key={"header"}>
            {mapHeaders(["Project Name", "Owner", "Status", "Start Date", "End Date"])}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {mapProjects(projectData)}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default ProjectPage;