import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuth } from "../../context/auth";
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { validateEmail } from '../../actions';
import axios from "axios";

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens, setIsLoggedIn, isLoggedIn } = useAuth();

  const postLogin = () => {
    if (!email || !password) {
      setIsError(true);
      setErrorMsg("Please fill in all fields");
      return false;
    }
    if (!validateEmail(email)) {
      setIsError(true);
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    
    axios.post("/users/login", { email, password })
    .then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setIsLoggedIn(true);
      }
    })
    .catch(err => {
      console.log(err.response);
      setIsError(true);
      setErrorMsg("Email or password are invalid.");
    })
    // .then(() => {
    //   axios.get("/secret", (req, res) => {
    //     console.log("?????", req.isAuthenticated())
    //   }).then(result => {
    //     console.log(result);
    //     console.log("COOKIE: ", document.cookie)
    //   })
    // })
  }

  const closeButton = () => {
    setIsError(false);
  }

  const displayErrorMsg = () => {
    return errorMsg;
  }

  return(
    <div className={styles.Login}>
      {isLoggedIn && <Redirect to="/home"/>}
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Login
          </Header>
          <Segment>
            <Form size="large">
              <Form.Input
                fluid
                name="email"
                icon="envelope"
                iconPosition="left"
                placeholder="Email address"
                onChange={e => {
                  setEmail(e.target.value)
                }}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />

              <Button 
                color="blue" 
                fluid size="large"
                onClick={postLogin}
              >
                Login
              </Button>
            </Form>
          </Segment>
          <Message>
            Not registered yet? <Link to="/signup">Sign Up</Link>
          </Message>
          {isError && <div className="ui negative message">
                        <i className="close icon" onClick={e => {closeButton()}}></i>
                        <div className="header">
                          {displayErrorMsg()}
                        </div>
                      </div>}
        </Grid.Column>
      </Grid>
    </div>
  )
};

export default Login;