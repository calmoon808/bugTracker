import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { getChartData, graphDoughnutChart, getCurrentProjectData } from "../../actions";
import { usePageData } from "../../context/pageData";
import BugTableComponent from "../../components/BugTableComponent";
import UserTableComponent from "../../components/UserTableComponent";
import ProjectBugAddModal from "../../components/ProjectBugAddModalComponent/";
import GetStream from "../../components/GetStreamComponent";
import { useAuth } from "../../context/auth";
import styles from "./ProjectDashboardPage.module.scss";

const ProjectDashboardPage = () => {
  const { currentProjectData, setCurrentProjectData } = usePageData();
  const { authTokens } = useAuth();
  const chartRef = useRef();
  const projectId = useParams();
  const [projectUserArr, setProjectUserArr] = useState();
  
  useEffect(() => {
    getCurrentProjectData({ projectId: projectId.id, authTokens })
    .then(response => {
      setCurrentProjectData(response);
    });
    // eslint-disable-next-line
  }, [setCurrentProjectData])

  useEffect(() => {
    getChartData("bugs", projectId, "project")
    .then(data => {
      if (chartRef.current) {
        const myChartRef = chartRef.current.getContext("2d");
        graphDoughnutChart(myChartRef, data);
      }
    })
    if (currentProjectData){
      let freqObj = {};
      let bugsArr = [...currentProjectData.data.bugs];
      bugsArr.map(bug => { 
        return bugsArr[bugsArr.indexOf(bug)] = bug.users 
      });
      const mergedArr = [].concat.apply([], bugsArr);
      for (let i = 0; i < mergedArr.length; i++){
        if (!freqObj[mergedArr[i].id]){
          freqObj[[mergedArr[i].id]] = 1;
        } else {
          mergedArr.splice(i, 1);
          i--;
        }
      }
      setProjectUserArr(mergedArr);
    };
  // eslint-disable-next-line
  }, [chartRef, currentProjectData, setProjectUserArr]);
  
  return (
    <div className={styles.ProjectDashboardPage}>
      <h1>PROJECT DASHBOARDPAGE</h1>
      {currentProjectData && <Grid stretched={true}>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>Project Overview</div>
              <canvas
                id='projectBugChart'
                ref={chartRef}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>Bugs</div>
              <ProjectBugAddModal
                projectId={projectId}
              />
              <BugTableComponent
                headers={[["#", "id"], ["Name", "bug"], ["Poster", "posterFullName"], ["Status", "status"], ["Due Date", "dueDate"]]}
                data={currentProjectData.data}
                setCurrentProjectData={setCurrentProjectData}
                type={"myBugs"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>People Assigned</div>
              {projectUserArr && <UserTableComponent
                headers={[["Name", "userFullName"], ["Position", "position"], ["Company", "company"]]}
                users={projectUserArr}
              />}
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>Activity Feed</div>
              <GetStream />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>}
    </div>
  );
};

export default ProjectDashboardPage;