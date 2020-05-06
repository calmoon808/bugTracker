import React, { useState, useEffect } from 'react';
import { Container, Segment, Image, Button, Grid } from 'semantic-ui-react';
import styles from './UserProfilePage.module.scss'
import { useAuth } from '../../context/auth';
import { usePageData } from '../../context/pageData';
import { getUserData } from '../../actions';
import profilePlaceholderImg from '../../imgs/blue.png';
import ProfileList from '../../components/ProfileListComponent';

const UserProfilePage = () => {
  const { authTokens } = useAuth();
  const { userData } = usePageData();
  const [userProfileData, setUserProfileData] = useState();

  useEffect(() => {
    if (Object.keys(userData).length === 0){
      getUserData({ data: authTokens })
      .then(response => {
        setUserProfileData(response.data)
      })
    } else {
      setUserProfileData(userData.data)
    }
  }, [setUserProfileData, authTokens, userData]);

  return (
    <div className={styles.UserProfilePage}>
      <h1>User Profile Page</h1>
      <Container fluid>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image 
                  src={profilePlaceholderImg}
                />
                <Button 
                  onClick={() => {console.log(userProfileData)}}
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <ProfileList userData={userProfileData}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </div>
  );
};

export default UserProfilePage;