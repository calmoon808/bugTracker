import React, { useEffect } from 'react';
import styles from "./DashboardPage.module.scss";
import { Grid } from 'semantic-ui-react';
import Chart from "chart.js";
import CardComponent from '../../components/CardComponent/Card';
import { dashboardGraphOptions } from '../../graphOptions'

const DashboardPage = () => {
  let chartRef = React.createRef();
  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, dashboardGraphOptions)
  })

  return (
    <div className={styles.DashboardPage}>
      <h1>DashboardPage</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <CardComponent 
              title={"My Overview"}
              canvas={
                <canvas
                  id="myChart"
                  ref={chartRef}
                />
              }
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <h1>2</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <h1>3</h1>
          </Grid.Column>
          <Grid.Column width={8}>
            <h1>4</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default DashboardPage;