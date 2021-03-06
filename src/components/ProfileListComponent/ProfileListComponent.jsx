import React, { useState, useEffect } from 'react';
import { List } from "semantic-ui-react";
import BasicUserEditModal from "../BasicUserEditModalComponent";

const ProfileList = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();

  useEffect(() => {
    if (props.userData){
      const user = props.userData.data;
      setName(`${user.first_name} ${user.last_name}`);
      setEmail(user.email);
      setPosition(user.company_position.name);
    }
  }, [props.userData]);

  return (
    <List relaxed>
      <List.Item>
        <List.Icon name="user" size="big"/>
        <List.Content>
          <h2>
            <span>Name: {name}</span>
            <BasicUserEditModal 
              changeType="name"
              setFunc={setName}
              modalContent={["First Name: ", "Last Name: "]}
            />
          </h2>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="mail" size="big"/>
        <List.Content>
          <h2>
            <span>Email: {email}</span>
            <BasicUserEditModal 
              changeType="email"
              setFunc={setEmail}
              modalContent={["Email: "]}
            />
          </h2>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="briefcase" size="big"/>
        <List.Content>
          <h2>
            <span>Position: {position}</span>
            <BasicUserEditModal
              changeType="position"
              setFunc={setPosition}
              modalContent={["Position: "]}
            />
          </h2>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default ProfileList;