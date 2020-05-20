import React, { useEffect, useState } from 'react';
import { Modal, Button, Dropdown } from 'semantic-ui-react';
import { useAuth } from "../../context/auth";
import { usePageData } from '../../context/pageData';
import { getUsers, updateBug, getUserData, getCurrentProjectData, findBug, removeBugUser, mapUsers } from "../../actions";
import BugCommentComponent from "../BugCommentComponent";
import StatusPriorityDropdown from "../StatusPriorityDropdownComponent";
import BugDescription from "../BugDescriptionComponent";

const BugModal = (props) => {
  const { authTokens } = useAuth();
  const { setUserData, setCurrentProjectData } = usePageData();
  const [bug, setBug] = useState(props.bug);
  const [bugStatus, setBugStatus] = useState({ id: bug.status_id, name: bug.status });
  const [bugPriority, setBugPriority] = useState({ id: bug.priority_id, name: bug.priority });
  const [isSearchingAdd, setIsSearchingAdd] = useState(false);
  const [isSearchingRemove, setIsSearchingRemove] = useState(false);
  const [userSearchArr, setUserSearchArr] = useState();
  const [assignedToUsers, setAssignedToUsers] = useState(mapUsers(bug.users));
  const [addUserArr, setAddUserArr] = useState();
  const [deleteUserArr, setDeleteUserArr] = useState();

  useEffect(() => {
    findBug({ bugId: bug.id })
    .then(bug => {
      setAssignedToUsers(mapUsers(bug.users));
    })
  }, [bug]);

  useEffect(() => {
    getUsers().then(response => {
      let freqObj = {};
      let newArr = [];
      for (let user of assignedToUsers){
        if (!freqObj[user.key]) freqObj[user.key] = 1
      }
      for (let user of response){
        if (!freqObj[user.id]) {
          newArr.push({
            key: user.id,
            text: `${user.first_name} ${user.last_name}`,
            value: user.id
          })
        }
      }
      setUserSearchArr(newArr);
    });
  }, [assignedToUsers]);

  const handleCancel = async () => {
    console.log(bugStatus, bugPriority);
    if (bugStatus.id !== bug.status_id) setBugStatus({
      id: bug.status_id,
      name: bug.status
    });
    if (bugPriority.id !== bug.priority_id) setBugPriority({
      id: bug.priority_id,
      name: bug.priority
    });
    await props.setIsModalOpen(false);
    props.setIsModalOpen();
  }

  const handleUserSearchChange = (value, addOrRemove) => {
    let newArr = [];
    value.forEach(user_id => {
      let newObj = { 
        bugs_id: bug.id,
        users_id: user_id,
      }
      newArr.push(newObj);
    });
    if (addOrRemove === "add") {
      setAddUserArr(newArr);
    } else {
      setDeleteUserArr(newArr);
    };
  };

  const handleSubmit = async () => {
    let newObj = { 
      id: authTokens.id,
      bug_id: bug.id,
      projectId: bug.projectId
    };
    if (bugStatus.name !== bug.status) newObj.status = bugStatus.id;
    if (bugPriority.name !== bug.priority) newObj.priority = bugPriority.id;
    if (Array.isArray(addUserArr)) newObj.newUserArr = addUserArr;
    updateBug(newObj).then(() => {
      if (props.setCurrentProjectData) {
        getCurrentProjectData({ projectId: bug.projectId, authTokens })
        .then(response => {
          setCurrentProjectData(response)
        });
      } 
      if (props.setUserData) {
        getUserData(authTokens)
        .then(response => {
          setUserData(response)
        });
      }
    });
    if (Array.isArray(deleteUserArr)) {
      removeBugUser([deleteUserArr, bug.projectId]);
    }
    await props.setIsModalOpen(false);
    props.setIsModalOpen();  
  }

  return (
    <>
      <Modal.Header>Bug #{bug.id}</Modal.Header>
      <Modal.Content>
        <span>
          <h1>{bug.bug}</h1>
          <p>by: {bug.posterFullName} on {bug.startDate}</p>
          <BugDescription 
            bug={bug}
          />
        </span><br/>
        <Dropdown 
          text="Assigned to" 
          button={true} 
          options={assignedToUsers} 
        />
        <Button 
          icon="user plus" 
          size='medium'
          basic circular 
          onClick={() => {
            isSearchingAdd === false ? setIsSearchingAdd(true) : setIsSearchingAdd(false);
            setIsSearchingRemove(false);
            setDeleteUserArr();
          }}
        />
        <Button 
          icon="user times" 
          size='medium'
          basic circular 
          onClick={() => {
            isSearchingRemove === false ? setIsSearchingRemove(true) : setIsSearchingRemove(false);
            setIsSearchingAdd(false);
            setAddUserArr();
          }}
        />
        {isSearchingAdd && 
          <Dropdown
            placeholder="Add Users"
            search 
            multiple
            selection
            options={userSearchArr}
            onChange={(e, {value}) => handleUserSearchChange(value, "add")}
          />}
        {isSearchingRemove && 
          <Dropdown
            placeholder="Remove Users"
            search 
            multiple
            selection
            options={assignedToUsers}
            onChange={(e, {value}) => handleUserSearchChange(value, "remove")}
          />}
        <h3>
          Status: {bugStatus.name}
          <StatusPriorityDropdown 
            setFunc={setBugStatus}
            items={["Closed", "In-Progress", "Fixed"]}
          />
          <br/><br/>
          Priority: {bugPriority.name}
          <StatusPriorityDropdown 
            setFunc={setBugPriority}
            items={["High", "Medium", "Low"]}
          />
        </h3>
        <BugCommentComponent 
          bugId={bug.id}
          projectId={bug.projectId}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button 
          negative
          icon='cancel'
          labelPosition='right'
          content='Cancel'
          onClick={handleCancel}
        />
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Submit'
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </>
  );
};

export default BugModal;