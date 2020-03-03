import React, {Component} from 'react';
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
// import NavigationMenu from '../components/NavigationMenuComponent';

export default function App(props) {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={false}>
      <Router>
        <Header />
        {/* {this.state.isLoggedIn ? <NavigationMenu /> : <Redirect to="/authorization" />} */}
        <Container className="Container">
          <Switch>
            <PrivateRoute path="/admin" component={AdminPage}></PrivateRoute>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </Router>
    </AuthContext.Provider>
  )
}