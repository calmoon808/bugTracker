import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-react";
import { Container } from "semantic-ui-react";
import Header from "../components/HeaderComponent/Header";
import Login from '../components/LoginComponent';
import SignUp from '../components/SignUpComponent';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import PrivateRoute from '../decorators/PrivateRoute';
import { AuthContext } from "../context/auth";
import NavigationMenu from '../components/NavigationMenuComponent';

export default function App(props) {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || "");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setTokens = (data) => {
    localStorage.setItem("authTokens", JSON.stringify(data));
    setAuthTokens(data);
    setIsLoggedIn(data.isAuthenticated);
    console.log(data, isLoggedIn);
  }

  const setLoggedIn = (data) => {
    setIsLoggedIn(data)
  }

  return (
    <AuthContext.Provider value={{
      authTokens, 
      setAuthTokens: setTokens,
      isLoggedIn,
      setIsLoggedIn: setLoggedIn
    }}>
      <Router>
        {isLoggedIn ? 
        <>
          <NavigationMenu />
          <Container className="Container">
            <Header /> 
            <Switch>
              <PrivateRoute path="/admin" component={AdminPage}></PrivateRoute>
              <Route path="/home" component={HomePage} />
            </Switch>
          </Container>
        </>: 
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        }
      </Router>
    </AuthContext.Provider>
  )
}