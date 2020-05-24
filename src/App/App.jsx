import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "semantic-ui-react";
import { Container } from "semantic-ui-react";
import NavigationMenu from '../components/NavigationMenuComponent';
import Header from "../components/HeaderComponent/Header";
import Login from '../components/LoginComponent';
import SignUp from '../components/SignUpComponent';
import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import ProjectPage from '../pages/ProjectPage';
import ProjectDashboardPage from '../pages/ProjectDashboardPage'
import PrivateRoute from '../decorators/PrivateRoute';
import UserProfilePage from '../pages/UserProfilePage';
import { AuthContext } from "../context/auth";
import { PageDataContext } from "../context/pageData";

export default function App() {
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem('authTokens')) || "");
  const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.match(/^(.*;)?\s*headerPayload\s*=\s*[^;]+(.*)?$/) !== null);
  const [activePage, setActivePage] = useState(`/${document.URL.split('/')[3]}`);
  const [currentProjectData, setCurrentProjectData] = useState();
  const [userData, setUserData] = useState();
  const [referrer, setReferrer] = useState(-1);

  const setTokens = (data) => {
    localStorage.setItem("authTokens", JSON.stringify(data.session.passport.user));
    localStorage.setItem("isAuthenticated", data.isAuthenticated);
    setAuthTokens(data);
    setIsLoggedIn(data.isAuthenticated);
  }

  return (
    <AuthContext.Provider value={{
      authTokens, setAuthTokens: setTokens,
      isLoggedIn, setIsLoggedIn,
      activePage, setActivePage
    }}>
      <Router>
        {isLoggedIn ? 
        <>
          <PageDataContext.Provider value={{
            currentProjectData, setCurrentProjectData,
            userData, setUserData,
            referrer, setReferrer
          }}>
            <NavigationMenu setReferrer={setReferrer} className="NavMenu" />
            <Header /> 
            <Container fluid className="Container">
              <Switch>
                  <PrivateRoute path="/admin" component={AdminPage}></PrivateRoute>
                  <Route exact path="/" component={DashboardPage} />
                  <Route path="/projects/:id" component={ProjectDashboardPage} />
                  <Route exact path="/projects" component={ProjectPage} />
                  <Route path ="/profile" component={UserProfilePage} />
              </Switch>
            </Container>
          </PageDataContext.Provider>
        </>
        : 
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        }
      </Router>
    </AuthContext.Provider>
  )
}