import React from 'react';
import { Redirect } from 'react-router-dom';
import { Image, Menu } from 'semantic-ui-react';
import styles from "./Header.module.scss";
import bugIcon from "../../icons/bugIcon.png"
import { useAuth } from "../../context/auth";
import axios from 'axios';

const Header = () => {
  const { setIsLoggedIn } = useAuth();

  const logoutOnClick = () => {
    axios.get("/api/users/logout")
    .then(() => {
      setIsLoggedIn(false);
      localStorage.clear();
    })
    .catch(err => {
      console.log(err.response)
    })
    return <Redirect to="/"/>
  }

  return (
    <Menu className={styles.Menu}>
      <Menu.Item>
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
    </Menu>
  )
};

export default Header;