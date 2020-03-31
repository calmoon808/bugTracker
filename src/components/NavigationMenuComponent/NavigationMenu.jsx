import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import styles from "./NavigationMenu.module.scss"
import { useAuth } from "../../context/auth";

const NavigationMenu = () => {
  const { activePage, setActivePage } = useAuth()

  const handlePageClick = (e, { name }) => {
    setActivePage(name);
  }

  return (
    // <div className={styles.NavigationMenu}>
    //   NAVIGATION MENU
      <Grid className={styles.Grid}>
        <Grid.Column width={16} className={styles.Column}>
          <Menu inverted vertical pointing className={styles.Menu}>
            <Menu.Item
              name='BugTracker'
            />
            <Menu.Item
              as={Link} to='/'
              name='/'
              content='Dashboard'
              active={activePage === '/'}
              onClick={handlePageClick}
            />
            <Menu.Item 
              as={Link} to='/projects'
              name='/projects' 
              content='My Projects'
              active={activePage === '/projects'}
              onClick={handlePageClick}
            />
            <Menu.Item
              name='/tickets'
              content='My Tickets'
              active={activePage === 'My Tickets'}
              onClick={handlePageClick}
            />
            <Menu.Item
              name='/profile'
              content='UserProfile'
              active={activePage === 'UserProfile'}
              onClick={handlePageClick}
            />
          </Menu>
        </Grid.Column>
      </Grid>
    // </div>
  );
}

export default NavigationMenu;