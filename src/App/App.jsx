import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-react";
import { Container } from "semantic-ui-react";
import Header from "../components/HeaderComponent/Header";
import AuthorizationPage from '../pages/AuthorizationPage';
import HomePage from '../pages/HomePage';
// import NavigationMenu from '../components/NavigationMenuComponent';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: true
    }
  }

  render() {
    return (
      <Router>
        <Header />
        {/* {this.state.isLoggedIn ? <NavigationMenu /> : <Redirect to="/authorization" />} */}
        <Container className="Container">
          <Switch>
            <Route path="/authorization" component={AuthorizationPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </Router>
    )
  }
}