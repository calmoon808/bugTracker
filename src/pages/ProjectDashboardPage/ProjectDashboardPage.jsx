import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { StreamApp, FlatFeed, Activity, LikeButton } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import styles from "./ProjectDashboardPage.module.scss";
import { getChartData, graphDoughnutChart } from "../../actions";
import { usePageData } from "../../context/pageData";
import BugTableComponent from "../../components/BugTableComponent";
import UserTableComponent from "../../components/UserTableComponent";
import axios from "axios";
import Cookies from 'js-cookie';
import { useAuth } from "../../context/auth";

const ProjectDashboardPage = () => {
  const { currentProjectData, setCurrentProjectData, projectUserArr, setProjectUserArr } = usePageData();
  const { authTokens } = useAuth();
  const chartRef = useRef();
  const projectId = useParams();
  
  useEffect(() => {
    axios.post("/projects/dashboard", { projectId, authTokens })
    .then(response => {
      setCurrentProjectData(response);
    });
    // eslint-disable-next-line
  }, [setCurrentProjectData])

  useEffect(() => {
    getChartData("bugs", projectId, "project")
    .then(data => {
      const myChartRef = chartRef.current.getContext("2d");
      graphDoughnutChart(myChartRef, data);
    })
    if (currentProjectData.data){
      let freqObj = {};
      let bugsArr = [...currentProjectData.data.bugs];
      bugsArr.map(bug => { return bugsArr[bugsArr.indexOf(bug)] = bug.users });
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
      <Grid>
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
              <BugTableComponent
                headers={["Name", "Poster", "Status", "Due Date"]}
                data={currentProjectData.data}
                type={"myBugs"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>People Assigned</div>
              <UserTableComponent
                headers={["Name", "Position", "Company"]}
                data={projectUserArr}
                
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>Activity Feed</div>
              <StreamApp
                apiKey={process.env.REACT_APP_ACTIVITY_FEED_KEY}
                appId={process.env.REACT_APP_ACTIVITY_FEED_ID}
                token={Cookies.get('activityFeedToken')}
              > 
                <FlatFeed 
                  feedGroup="projectFeed"
                  LoadingIndicator
                  Activity={(props) => 
                    <Activity {...props} 
                      Footer={() => (
                        <div>
                          <LikeButton {...props} />
                        </div>
                      )}
                    />
                  }
                />
              </StreamApp>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProjectDashboardPage;