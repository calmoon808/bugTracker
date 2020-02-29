import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-react";
import { Container } from "semantic-ui-react";
import NavigationMenu from "../components/NavigatrionMenuComponent/NavigationMenu";
import AuthorizationPage from '../pages/AuthorizationPage';
import HomePage from '../pages/HomePage';
import DashboardComponent from '../components/DashboardComponent';

export default function App() {
  return (
    <Router>
      <NavigationMenu />
      <DashboardComponent />
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