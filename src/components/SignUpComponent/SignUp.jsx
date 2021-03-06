import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import styles from './SignUp.module.scss';
import { Button, Form, Grid, Header, Segment} from 'semantic-ui-react';
import { validateEmail } from '../../actions'
import axios from "axios";

const SignUp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const postSignUp = () => {
    if (!email || !name || !password || !passwordConfirm) {
      setIsError(true);
      setErrorMsg("Please fill in all fields");
      return false;
    }
    if (!validateEmail(email)) {
      setIsError(true);
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    if (password !== passwordConfirm){
      setIsError(true);
      setErrorMsg("Passwords do not match.");
      return false;
    };

    
    let nameArr = name.split(' ');
    let firstName = nameArr[0];
    let lastName = nameArr[1] || "";
    let data = {
      email,
      password,
      firstName,
      lastName,
    }
    axios.post("/api/users/signup", data)
    .then(result => {
      setIsSuccess(true);
      setIsError(false);
    })
    .catch(err => {
      setIsError(true);
      setIsSuccess(false);
      setErrorMsg(err.response.data);
    })
  }

  const closeButton = () => {
    setIsError(false);
  }

  const displayErrorMsg = () => {
    return errorMsg;
  }

  return(
    <div className={styles.SignUp}>
      {isSuccess && <Redirect to="/"/>}
      <Grid centered columns={2}>
        <Grid.Column className={styles.SegmentContainer}>
          <Segment className={styles.Segment}>
            <Header as="h2" textAlign="center">
              Sign Up
            </Header>
            <Form size="large">
              <Form.Input 
                name="email"
                icon="envelope"
                iconPosition="left"
                placeholder="Email address"
                onChange={e => {
                  setEmail(e.target.value)
                }}
              />
              <Form.Input 
                icon="user"
                iconPosition="left"
                placeholder="Full name"
                onChange={e => {
                  setName(e.target.value)
                }}
              />
              <Form.Input
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
                onChange={e => {
                  setPasswordConfirm(e.target.value)
                }}
              />

              <Button 
                color="blue" 
                fluid size="large"
                onClick={e => {
                  postSignUp();
                }}
              >
                Sign Up
              </Button>
            </Form>
          </Segment>
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
}

export default SignUp;