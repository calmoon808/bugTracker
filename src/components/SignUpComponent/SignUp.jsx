import React from 'react';
import styles from './SignUp.module.scss';

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

export default () => (
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

            <Button color="blue" fluid size="large">
              Sign Up
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
)