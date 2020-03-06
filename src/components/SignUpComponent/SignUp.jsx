import React, { Component, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import styles from './SignUp.module.scss';
import { useAuth } from "../../context/auth";
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react';
import axios from "axios";

class SignUp extends Component {

  onSubmit = (e) => {
    console.log(e.target.email);
  }

  onChange = (e) => {

  }

  render(){
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
                />
                <Form.Input 
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Full name"
                />
                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                />
  
                <Button 
                  color="blue" 
                  fluid size="large"
                  onClick={this.onSubmit}
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
}

export default SignUp;