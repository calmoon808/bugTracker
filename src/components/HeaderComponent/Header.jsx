import React from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Image, Menu } from 'semantic-ui-react';
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
      <Menu.Item position="">
        <Image
          size="mini"
          src={bugIcon}
        />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon='search' placeholder='Search....'/>
        </Menu.Item>
        <Menu.Item name="logout" onClick={ () => logoutOnClick() }>
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
};

export default Header;