import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import styles from "./NavigationMenu.module.scss";
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
        <Menu.Item as="a" name="login">
          Login
        </Menu.Item>
        <Menu.Item as="a" name="register">
          Register
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);