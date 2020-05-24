import React, { useEffect, useRef, useState } from 'react';
import styles from "./DashboardPage.module.scss";
import { Grid, Segment } from 'semantic-ui-react';
import { usePageData } from "../../context/pageData";
import { useAuth } from "../../context/auth";
import { getChartData, graphDoughnutChart, getUserData } from "../../actions";
import BugTableComponent from '../../components/BugTableComponent';
import EmptyTableReplacement from '../../components/EmptyTableReplacementComponent';

const DashboardPage = () => {
  const { userData, setUserData } = usePageData();
  const { authTokens } = useAuth();
  const [isChartEmpty, setIsChartEmpty] = useState(false);
  const chartRef = useRef();
  const bugHeaders = [["#", "id"], ["Name", "bug"], ["Poster", "posterFullName"], ["Status", "status"], ["Due Date", "dueDate"]];

  useEffect(() => {
    getUserData(authTokens)
    .then(response => {
      setUserData(response)
    })
  }, [authTokens, setUserData]);

  useEffect(() => {
    getChartData("bugs", {id: authTokens.id.toString()}, "users")
    .then(data => {
      if (JSON.stringify(data) === "[0,0,0]") {
        setIsChartEmpty(true);
        return
      }
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
            <Segment className={styles.Segment}>
              <div>Bugs Overview</div>
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
            <Segment className={styles.Segment}>
              <div>Things Due Today</div>
              <BugTableComponent 
                headers={bugHeaders}
                data={userData.data}
                type={"dueToday"}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment className={styles.Segment}>
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