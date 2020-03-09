import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuth } from "../../context/auth";
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import axios from "axios";

const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const postLogin = () => {
    // console.log(useAuth)
    // axios.post("/users/login")
    //   .then(response => {
    //     console.log(response);
    //     return "postlogin";
    //   })
    axios.post("/users/login", { email, password })
    .then(result => {
      console.log("hello");
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
      return;
    });
  }

  const referer = props.location.state ? props.location.state.referer : "/";

  if (isLoggedIn) {
    return <Redirect to={referer} />
  }

  return(
    <div className={styles.Login}>
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
            { isError &&<div>The username or password provided were incorrect!</div> }
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
};

export default Login;