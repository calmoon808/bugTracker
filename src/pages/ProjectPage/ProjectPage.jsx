import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { usePageData } from '../../context/pageData';
import { Table, Segment } from 'semantic-ui-react';
import { useAuth } from "../../context/auth";
import { sortBy, map } from "lodash";
import { setProjectFeedCookie, getUserData } from "../../actions";
import EmptyTableReplacement from '../../components/EmptyTableReplacementComponent';

const ProjectPage = () => {
  const { userData, setUserData } = usePageData();
  const { authTokens } = useAuth();
  const [referrer, setReferrer] = useState(-1)
  const [projectData, setProjectData] = useState();
  const [sortData, setSortData] = useState();
  const [isTableEmpty, setIsTableEmpty] = useState(false);

  useEffect(() => {
    getUserData(authTokens)
    .then(response => {
      setUserData(response);
    });
  }, [authTokens, setUserData]);

  useEffect(() => {
    if (userData){
      const projects = userData.data.projects;
      if (projects.length === 0) {
        setIsTableEmpty(true);
        return;
      }
      const bugsArr = userData.data.bugs;
      let newArr = [];
      let freqObj = {};
      for (let i of bugsArr){
        if (!freqObj[i.project.id]){
          freqObj[i.project.id] = 1;
          newArr.push(i.project);
        }
      }
      for (let i of projects){
        if (!freqObj[i.id]){
          freqObj[i.id] = 1;
          newArr.push(i);
        }
      }
      setProjectData(newArr);
      setSortData({
        column: null,
        data: newArr,
        direction: null
      })
    }
  }, [userData])

  const handleSort = (clickedColumn) => () => {
    const { column, data, direction } = sortData;

    if (column !== clickedColumn) {
      setSortData({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: 'ascending'      
      })
      return;
    }

    setSortData({
      column: column,
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  const handleClick = async (id) => {
    await setProjectFeedCookie(id);
    setReferrer(id);
  }

  const mapHeaders = (headers) => {
    if (!sortData) return false
    if (!headers) return false;
    const { column, direction } = sortData;
    return headers.map(header => {
      return (
        <Table.HeaderCell 
          key={header[0]}
          sorted={column === header[1] ? direction : null}
          onClick={handleSort(header[1])}
        >
          {header[0]}
        </Table.HeaderCell>
      )
    })
  }

  const mapProjects = (projects) => {
    if (!projects) return false;
    if (!sortData) return false;
    const { data } = sortData;
    const cleanData = [];
    data.forEach(project => {
      let newObj = {
        id: project.id,
        name: project.name,
        owner: `${project.project_creator.first_name} ${project.project_creator.last_name}`,
        status: project.project_status.status,
        startDate: project.created_at.split("T")[0],
        endDate: project.due_date === null ? "-" : project.due_date.split("T")[0]
      }
      cleanData.push(newObj);
    })

    return map(cleanData, ({ id, name, owner, status, startDate, endDate }) => {
      return (
        <Table.Row onClick={() => handleClick(id)} key={id}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{owner}</Table.Cell>
          <Table.Cell>{status}</Table.Cell>
          <Table.Cell>{startDate}</Table.Cell>
          <Table.Cell>{endDate}</Table.Cell>
        </Table.Row>
      )
    })
  }

  if (referrer > -1) {
    return <Redirect to={`/projects/${referrer}`}/>
  }

  return (
    <Segment>
      <h1>PROJECT PAGE</h1>
      {isTableEmpty ? 
        <EmptyTableReplacement 
          tableType="projects"
        />
        :
        <Table celled inverted selectable sortable>
          <Table.Header>
            <Table.Row key={"header"}>
              {mapHeaders([
                ["Project Name", "name"],
                ["Owner", "owner"],
                ["Status", "status"],
                ["Start Date", "startDate"],
                ["End Date", "endDate"]
              ])}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {mapProjects(projectData)}
          </Table.Body>
        </Table>
      }
    </Segment>
  );
}

export default ProjectPage;