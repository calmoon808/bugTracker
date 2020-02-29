import React, { Component } from 'react';
import styles from "./DashboardComponent.module.scss"

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.Dashboard}>
        <h3>DASHBOARD</h3>
      </div>
    );
  }
}

export default Dashboard;