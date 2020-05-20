import React, { useEffect, useRef } from 'react';
import styles from "./DashboardPage.module.scss";
import { Grid, Segment } from 'semantic-ui-react';
import { usePageData } from "../../context/pageData";
import { useAuth } from "../../context/auth";
import { getChartData, graphDoughnutChart, getUserData } from "../../actions";
import BugTableComponent from '../../components/BugTableComponent';

const DashboardPage = () => {
  const { userData, setUserData } = usePageData();
  const { authTokens } = useAuth();
  const chartRef = useRef();
  const bugHeaders = [["#", "id"], ["Name", "bug"], ["Poster", "posterFullName"], ["Status", "status"], ["Due Date", "dueDate"]];

  useEffect(() => {
    getUserData(authTokens)
    .then(response => {
      setUserData(response)
    })
  }, [authTokens, setUserData]);

  useEffect(() => {
    getChartData("bugs", authTokens, "users")
    .then(data => { 
      if (chartRef.current){
        const myChartRef = chartRef.current.getContext("2d");
        graphDoughnutChart(myChartRef, data);
      }
    });
  }, [userData, authTokens, chartRef]);
  
  return (
    <div className={styles.DashboardPage}>
      <h1>
        DashboardPage
      </h1>
      {userData && <Grid stretched={true}>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <canvas
                id='myChart'
                ref={chartRef}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>My Bugs</div>
              <BugTableComponent 
                headers={bugHeaders}
                data={userData.data}
                setUserData={setUserData}
                type={"myBugs"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <div>Things Due Today</div>
              <BugTableComponent 
                headers={bugHeaders}
                data={userData.data}
                type={"dueToday"}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <div>Overdue Items</div>
              <BugTableComponent 
                headers={bugHeaders}
                data={userData.data}
                type={"overdue"}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>}
    </div>
  );
}

export default DashboardPage;