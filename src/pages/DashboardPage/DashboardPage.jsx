import React, { Component } from 'react';
import styles from "./DashboardPage.module.scss";
import { Link } from "react-router-dom";

class DashboardPage extends Component {
  render() {
    return (
      <div className={styles.DashboardPage}>
        <h1>DashboardPage</h1>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default DashboardPage;