import React, { useState } from 'react';
// import { Link, Redirect } from "react-router-dom";
import styles from './SignUp.module.scss';
// import { useAuth } from "../../context/auth";
import { Button, Form, Grid, Header, Segment} from 'semantic-ui-react';
import axios from "axios";

const SignUp = () => {

  // const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const postSignUp = () => {
    console.log('1')
    if (!email || !name || !password || !passwordConfirm) {
      alert("Please fill in all fields");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return false;
    }
    if (password !== passwordConfirm){
      alert("Passwords do not match.");
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
    axios.post("/users/signup", data)
    .then(result => {
      console.log(result)
    })
  }

  const validateEmail = (email) => {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  return(
    <div className={styles.SignUp}>
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Sign Up
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
                icon="user"
                iconPosition="left"
                placeholder="Full name"
                onChange={e => {
                  setName(e.target.value)
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
              <Form.Input
                fluid
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
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default SignUp;