import React, { useEffect, useRef } from 'react';
import styles from './ProjectDashboardPage.module.scss';
import { Grid, Segment } from 'semantic-ui-react';
import { usePageData } from "../../context/pageData";
import Chart from 'chart.js';
import axios from 'axios';

const ProjectDashboardPage = () => {
  const { userData } = usePageData();
  console.log(userData);

  return (
    <div className={styles.ProjectDashboardPage}>
      <h1>PROJECT DASHBOARDPAGE</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>Project Overview</div>
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