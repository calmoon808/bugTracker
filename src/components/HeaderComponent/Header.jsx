import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';
import styles from "./Header.module.scss";
import bugIcon from "../../icons/bugIcon.png"

export default () => (
  <Menu className={styles.Menu}>
    <Container>
      <Menu.Item as="a" header position="left">
        <Image
          size="mini"
          src={bugIcon}
        />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/login" name="login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to ="/signup" name="signup">
          Sign Up
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);