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
// import ProjectDisplay from '../components/ProjectDisplayComponent';
import ProjectDashboardPage from '../pages/ProjectDashboardPage'
import PrivateRoute from '../decorators/PrivateRoute';
import TicketPage from '../pages/TicketPage/TicketPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { AuthContext } from "../context/auth";
import { PageDataContext } from "../context/pageData";
// import TicketDisplay from '../components/TicketDisplayComponent/TicketDisplay';

export default function App() {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || "");
  const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.match(/^(.*;)?\s*headerPayload\s*=\s*[^;]+(.*)?$/) !== null);
  const [activePage, setActivePage] = useState(`/${document.URL.split('/')[3]}`);
  const [projectData, setProjectData] = useState([]);
  const [currentProjectData, setCurrentProjectData] = useState({});
  const [ticketData, setTicketData] = useState({});
  const [userData, setUserData] = useState({});
  const [referrer, setReferrer] = useState(-1);
  const [projectUserArr, setProjectUserArr] = useState([]);

  const setTokens = (data) => {
    localStorage.setItem("authTokens", JSON.stringify(data.session.passport.user));
    localStorage.setItem("isAuthenticated", data.isAuthenticated);
    setAuthTokens(data);
    setIsLoggedIn(data.isAuthenticated);
  }

  // const mapData = (data) => {
  //   if (data.config === undefined) { return false };
  //   if (data.config.url === "/projects"){
  //     return data.data.map(project => {
  //       return (
  //         <ProjectDisplay 
  //           key={project.id}
  //           project_name={project.name}
  //           project_creator={`${project.project_creator.first_name} ${project.project_creator.last_name || ''}`}
  //           company_name={project.company.name || ''}
  //         />
  //       )
  //     })
  //   }
  //   if (data.config.url === "/bugs"){
  //     return data.data.map(ticket => {
  //       return (
  //         <TicketDisplay
  //           key={ticket.id}
  //           description={ticket.bug}
  //           project={ticket.project.name}
  //           poster={`${ticket.poster.first_name} ${ticket.poster.last_name || ''}`}
  //           bug_status={ticket.bug_status.status}
  //           bug_priority={ticket.bug_priority.priority}
  //         />
  //       )
  //     })
  //   }
  // }

  return (
    <AuthContext.Provider value={{
      authTokens, setAuthTokens: setTokens,
      isLoggedIn, setIsLoggedIn,
      activePage, setActivePage
    }}>
      <Router>
        {isLoggedIn ? 
        <>
          <NavigationMenu className="NavMenu"></NavigationMenu>
          <Header /> 
          <Container className="Container">
            <Switch>
              <PageDataContext.Provider value={{
                projectUserArr, setProjectUserArr,
                projectData, setProjectData,
                currentProjectData, setCurrentProjectData,
                ticketData, setTicketData,
                userData, setUserData,
                referrer, setReferrer
              }}>
                <PrivateRoute path="/admin" component={AdminPage}></PrivateRoute>
                <Route exact path="/" component={DashboardPage} />
                <Route path="/projects/:id" component={ProjectDashboardPage} />
                <Route exact path="/projects" component={ProjectPage} />
                <Route path="/tickets" component={TicketPage} />
                <Route path ="/profile" component={ProfilePage} />
              </PageDataContext.Provider>
            </Switch>
          </Container>
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