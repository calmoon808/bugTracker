import React, { useState } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import styles from "./NavigationMenu.module.scss"

const NavigationMenu = () => {
  const [activeItem, setActiveItem] = useState('Dashboard')

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  } 

  return (
    // <div className={styles.NavigationMenu}>
    //   NAVIGATION MENU
      <Grid className={styles.Grid}>
        <Grid.Column width={28} className={styles.Column}>
          <Menu vertical pointing className={styles.Menu}>
            <Menu.Item
              name='BugTracker'
            />
            <Menu.Item
              name='Dashboard'
              active={activeItem === 'Dashboard'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='My Projects'
              active={activeItem === 'My Projects'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='My Tickets'
              active={activeItem === 'My Tickets'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='UserProfile'
              active={activeItem === 'UserProfile'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>
      </Grid>
    // </div>
  );
}

export default NavigationMenu;