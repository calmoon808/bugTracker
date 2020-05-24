import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { getChartData, graphDoughnutChart, getCurrentProjectData } from "../../actions";
import { usePageData } from "../../context/pageData";
import BugTableComponent from "../../components/BugTableComponent";
import UserTableComponent from "../../components/UserTableComponent";
import GetStream from "../../components/GetStreamComponent";
import EmptyTableReplacement from "../../components/EmptyTableReplacementComponent";
import { useAuth } from "../../context/auth";
import styles from "./ProjectDashboardPage.module.scss";

const ProjectDashboardPage = () => {
  const { currentProjectData, setCurrentProjectData } = usePageData();
  const { authTokens } = useAuth();
  const [projectUserArr, setProjectUserArr] = useState();
  const [isChartEmpty, setIsChartEmpty] = useState(false);
  const chartRef = useRef();
  const projectId = useParams();

  useEffect(() => {
    getCurrentProjectData({ projectId: projectId.id, authTokens })
    .then(response => {
      setCurrentProjectData(response);
    });
  }, [setCurrentProjectData, projectId.id, authTokens])

  useEffect(() => {
    getChartData("bugs", projectId, "project")
    .then(data => {
      if (JSON.stringify(data) === "[0,0,0]") {
        setIsChartEmpty(true);
        return
      }
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
            <Segment className={styles.Segment}>
              {isChartEmpty ?
                <EmptyTableReplacement 
                  tableType="overviewChart"
                />
                :
                <canvas
                  id='myChart'
                  ref={chartRef}
                />
              }
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment className={styles.Segment}>
              <div>Bugs</div>
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
            <Segment className={styles.Segment}>
              <div>People Assigned</div>
              {projectUserArr && <UserTableComponent
                headers={[["Name", "userFullName"], ["Position", "position"]]}
                users={projectUserArr}
              />}
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment className={styles.Segment}>
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