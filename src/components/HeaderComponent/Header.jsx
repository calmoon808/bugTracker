import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';
import styles from "./Header.module.scss";
import bugIcon from "../../icons/bugIcon.png"
import { useAuth } from "../../context/auth";
import axios from 'axios';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const logoutOnClick = () => {
    axios.get("/users/logout")
    .then(() => {
      setIsLoggedIn(false);
      localStorage.clear();
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  return (
    <Menu className={styles.Menu}>
        { !isLoggedIn && <Redirect to="/"/>}
      <Container>
        <Menu.Item as="a" header position="left">
          <Image
            size="mini"
            src={bugIcon}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={ () => logoutOnClick() }>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
};

export default Header;