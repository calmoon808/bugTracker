import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProjectDashboardPage.module.scss";
import { getChartData, graphDoughnutChart } from "../../actions";
import { Grid, Segment } from "semantic-ui-react";
import { usePageData } from "../../context/pageData";
import BugTableComponent from "../../components/BugTableComponent";
import axios from "axios";

const ProjectDashboardPage = () => {
  const { projectData, setProjectData } = usePageData();
  const chartRef = useRef();
  const projectId = useParams();
  
  useEffect(() => {
    axios.post("/projects/dashboard", projectId)
    .then(response => {
      setProjectData(response);
    })

    getChartData("bugs", projectId, "project")
    .then(data => {
      const myChartRef = chartRef.current.getContext("2d");
      graphDoughnutChart(myChartRef, data);
    })
    // eslint-disable-next-line
  }, [chartRef, setProjectData]);

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
                data={projectData.data}
                type={"myBugs"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>People Assigned</div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>Activity Feed</div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProjectDashboardPage;