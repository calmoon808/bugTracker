import React, { useEffect, useRef } from 'react';
import styles from "./DashboardPage.module.scss";
import { Grid, Segment } from 'semantic-ui-react';
import Chart from "chart.js";
import axios from 'axios';
import { dashboardGraphOptions } from '../../graphOptions';
import { usePageData } from "../../context/pageData";
import { useAuth } from "../../context/auth";
import { getGroupCount } from "../../actions";
// import CardComponent from '../../components/CardComponent';
import TableComponent from '../../components/TableComponent';

const DashboardPage = () => {
  const { dashboardData, setDashboardData } = usePageData();
  const { authTokens } = useAuth();

  const chartRef = useRef();
  useEffect(() => {
    axios.post("/users/dashboard", { data: authTokens })
    .then(response => {
      setDashboardData(response);
    });
  }, [authTokens, setDashboardData]);

  useEffect(() => {
    async function getChartData(){
      let data = [];
      const fixed = await getGroupCount("/bugs", "Fixed", authTokens );
      const inProgress = await getGroupCount("/bugs", "In-Progress", authTokens );
      const closed = await getGroupCount("/bugs", "Closed", authTokens );
      data.push(fixed.data.length);
      data.push(inProgress.data.length);
      data.push(closed.data.length);
      const myChartRef = chartRef.current.getContext("2d");
      new Chart(myChartRef, dashboardGraphOptions(
        'doughnut', 
        ['Fixed', 'In-Progress', 'Closed'],
        'Bugs',
        data,
        ['green', 'yellow', 'red']
      ))
    }
    getChartData();
  }, [dashboardData, authTokens, chartRef]);

  
  return (
    <div className={styles.DashboardPage}>
      <h1>DashboardPage</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>My Overview</div>
              <canvas
                id='myChart'
                ref={chartRef}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>My Bugs</div>
              <TableComponent 
                headers={["Name", "Poster", "Status", "Due Date"]}
                data={dashboardData.data}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default DashboardPage;