import React, { Component } from 'react';
import styles from "./HomePage.module.scss";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className={styles.HomePage}>
        <h1>HOMEPAGE</h1>
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

export default HomePage;