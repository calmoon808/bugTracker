import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "semantic-ui-react";
import { Container } from "semantic-ui-react";
import NavigationMenu from "../components/NavigatrionMenuComponent/NavigationMenu";
import AuthorizationPage from '../pages/AuthorizationPage';
import HomePage from '../pages/HomePage';
import DashboardComponent from '../components/DashboardComponent';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    return (
      <Router>
        <NavigationMenu />
        {this.state.isLoggedIn ? <DashboardComponent /> : <Redirect to="/authorization" />}
        <Container className="Container">
          <Switch>
            <Route path="/authorization">
             <AuthorizationPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Container>
      </Router>
    )
  }
}