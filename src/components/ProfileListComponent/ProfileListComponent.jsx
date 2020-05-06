import React, { useState, useEffect } from 'react';
import { List } from "semantic-ui-react";

const ProfileList = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [company, setCompany] = useState();
  const [position, setPosition] = useState();
  
  useEffect(() => {
    if (props.userData){
      const user = props.userData;
      setName(`${user.first_name} ${user.last_name}`);
      setEmail(user.email);
      setCompany(user.company.name);
      setPosition(user.company_position.name);
    }
  }, [props.userData]);

  return (
    <List>
      <List.Item>
        <List.Icon name="user" size="big"/>
        <List.Content>Name: {name}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="mail" size="big"/>
        <List.Content>Email: {email}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="users" size="big"/>
        <List.Content>Company: {company}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="briefcase" size="big"/>
        <List.Content>Position: {position}</List.Content>
      </List.Item>
    </List>
  );
};

export default ProfileList;