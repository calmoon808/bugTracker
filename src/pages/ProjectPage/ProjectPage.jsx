import React, { useEffect } from 'react';
import { usePageData } from '../../context/pageData';
import { Container, Table } from 'semantic-ui-react';
import { useAuth } from "../../context/auth";
import { isEmpty } from "lodash";
import axios from 'axios';

const ProjectPage = () => {
  const { userData, setUserData, projectData, setProjectData } = usePageData();
  const { authTokens } = useAuth();
  useEffect(() => {
    if (isEmpty(userData)){
      axios.post("/users/dashboard", { data: authTokens })
      .then(response => {
        setUserData(response);
      });
    }
    if (userData.data){
      let bugsArr = userData.data.bugs;
      let freqObj = {};
      for (let i of bugsArr){
        if (!freqObj[i.project.id]){
          freqObj[i.project.id] = 1;
          setProjectData(projectData => projectData.concat(i.project));
        }
      }
    }
  }, [authTokens, userData, setUserData, setProjectData]);

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
    
    console.log(projects);
    return projects.map(project => {
      return (
        <Table.Row key={project.id}>
          <Table.Cell>{project.name}</Table.Cell>
          <Table.Cell>{`${project.project_creator.first_name} ${project.project_creator.last_name}`}</Table.Cell>
          <Table.Cell>{project.project_status.status}</Table.Cell>
          <Table.Cell>{project.created_at.split("T")[0]}</Table.Cell>
          <Table.Cell>{project.due_date === null ? "-" : project.due_date.split("T")[0]}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Container>
      <h1>PROJECT PAGE</h1>
      <Table celled inverted selectable>
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