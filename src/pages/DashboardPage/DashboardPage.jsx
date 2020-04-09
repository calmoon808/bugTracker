import React, { Component } from 'react';
import styles from "./DashboardPage.module.scss";
import { Grid} from 'semantic-ui-react';

class DashboardPage extends Component {
  render() {
    return (
      <div className={styles.DashboardPage}>
        <h1>DashboardPage</h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <h1>1</h1>
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
}

export default DashboardPage;