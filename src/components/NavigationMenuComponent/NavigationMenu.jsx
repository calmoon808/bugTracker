import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import styles from "./NavigationMenu.module.scss"
import { useAuth } from "../../context/auth";
import BugAddModal from '../BugAddModalComponent';
import { usePageData } from '../../context/pageData';
import ProjectAddModal from '../ProjectAddModalComponent';

const NavigationMenu = (props) => {
  const { activePage, setActivePage } = useAuth();
  const { userData, currentProjectData } = usePageData();

  const handlePageClick = (e, { name }) => {
    setActivePage(name);
    props.setReferrer(-1);
  }

  return (
    <Grid className={styles.Grid}>
      <Grid.Column className={styles.Column}>
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
            as={Link} to='/profile'
            name='/profile'
            content='User Profile'
            active={activePage === 'profile'}
            onClick={handlePageClick}
          />
          {(userData && window.location.pathname === "/") && <ProjectAddModal />}
          {(currentProjectData && window.location.pathname.includes("/projects/")) && <BugAddModal />}
        </Menu>
      </Grid.Column>
    </Grid>
  );
}

export default NavigationMenu;