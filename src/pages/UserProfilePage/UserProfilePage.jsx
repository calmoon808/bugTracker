import React, { useState, useEffect } from 'react';
import { Segment, Image, Grid } from 'semantic-ui-react';
import styles from './UserProfilePage.module.scss'
import { useAuth } from '../../context/auth';
import { usePageData } from '../../context/pageData';
import { getUserData } from '../../actions';
import profilePlaceholderImg from '../../imgs/blue.png';
import ProfileList from '../../components/ProfileListComponent';
import PasswordChangeModal from '../../components/PasswordChangeModalComponent';
import ProfilePicChangeModal from '../../components/ProfilePicChangeModalComponent';

const UserProfilePage = () => {
  const { authTokens } = useAuth();
  const { userData, setUserData } = usePageData();
  const [userProfileData, setUserProfileData] = useState();

  useEffect(() => {
    if (Object.keys(userData).length === 0){
      getUserData({ data: authTokens })
      .then(response => {
        setUserProfileData(response.data);
        setUserData(response.data);
      })
    } else {
      setUserProfileData(userData.data)
    }
  }, [setUserProfileData, authTokens, userData, setUserData]);

  return (
    <>
      <h1>User Profile Page</h1>
      <Segment piled={true} className={styles.userProfilePage}>
        <Grid>
          <Grid.Row className={styles.theRow}>
            <Grid.Column width={4}>
              <Image 
                size='medium'
                src={profilePlaceholderImg}
              />
              <ProfilePicChangeModal />
              <PasswordChangeModal />
            </Grid.Column>
            <Grid.Column className={styles.profileList} width={12}>
              <ProfileList userData={userProfileData}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default UserProfilePage;