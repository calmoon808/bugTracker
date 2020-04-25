import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProjectDashboardPage.module.scss";
import { getChartData, graphDoughnutChart } from "../../actions";
import { Grid, Segment } from "semantic-ui-react";
import { usePageData } from "../../context/pageData";
import axios from "axios";

const ProjectDashboardPage = () => {
  const { userData } = usePageData();
  const chartRef = useRef();
  const projectId = useParams();
  console.log(userData, projectId);

  useEffect(() => {
    getChartData("bugs", projectId, "project")
    .then(data => {
      const myChartRef = chartRef.current.getContext("2d");
      graphDoughnutChart(myChartRef, data);
    })
  }, [chartRef]);

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