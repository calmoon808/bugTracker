import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-react";
import { Container } from "semantic-ui-react";
import Header from "../components/HeaderComponent/Header";
import Login from '../components/LoginComponent';
import SignUp from '../components/SignUpComponent';
import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import ProjectPage from '../pages/ProjectPage';
import PrivateRoute from '../decorators/PrivateRoute';
import { AuthContext } from "../context/auth";
import NavigationMenu from '../components/NavigationMenuComponent';

export default function App() {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || "");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAuthenticated') || "");

  const setTokens = (data) => {
    console.log(data);
    localStorage.setItem("authTokens", JSON.stringify(data.session.passport.user));
    localStorage.setItem("isAuthenticated", data.isAuthenticated)
    setAuthTokens(data);
    console.log('asdfasdfasdfasfasdf', data.isAuthenticated);
    setIsLoggedIn(data.isAuthenticated);
  }

  return (
    <AuthContext.Provider value={{
      authTokens, 
      setAuthTokens: setTokens,
      isLoggedIn,
      setIsLoggedIn
    }}>
      <Router>
        {isLoggedIn ? 
        <>
          <NavigationMenu className="NavMenu"></NavigationMenu>
          <Container className="Container">
            <Header /> 
            <Switch>
              <PrivateRoute path="/admin" component={AdminPage}></PrivateRoute>
              <Route path="/" component={DashboardPage} />
              <Route path="/projects" component={ProjectPage} />
            </Switch>
          </Container>
        </>
        : 
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        }
      </Router>
    </AuthContext.Provider>
  )
}