import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Dropdown } from 'semantic-ui-react';
import { getUsers, updateBug } from "../../actions";
import BugCommentComponent from "../BugCommentComponent";
import styles from "./BugModal.module.scss";

const BugModal = (props) => {
  const bug = props.bug;
  const [bugStatus, setBugStatus] = useState({ id: -1, name: "" });
  const [bugPriority, setBugPriority] = useState({ id: -1, name: "" });
  const [userSearchArr, setUserSearchArr] = useState();
  const [addUserArr, setAddUserArr] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState();
  let timeStampArr = bug.due_date.split("T");
  let dateFormat = timeStampArr[0];
  let assignedToUsers = props.userArr;

  useEffect(() => {
    setBugStatus({
      id: bug.bug_status_id,
      name: bug.bug_status.status
    });
    setBugPriority({
      id: bug.bug_priority_id,
      name: bug.bug_priority.priority
    });
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
      // setBugComments(sortComments(bug.comments));
    });
  }, [assignedToUsers, bug.bug_priority.priority, bug.bug_priority_id, bug.bug_status.status, bug.bug_status_id, bug.comments]);

  const handleUserSearchChange = (e, { value }) => {
    let newArr = [];
    value.forEach(user_id => {
      let newObj = { 
        bugs_id: bug.id,
        users_id: user_id
      }
      newArr.push(newObj)
    })
    setAddUserArr(newArr);
  }

  const handleSubmit = async () => {
    let newObj = { bug_id: bug.id };
    if (bugStatus !== bug.bug_status_id) newObj.status = bugStatus.id;
    if (bugPriority !== bug.bug_priority_id) newObj.priority = bugPriority.id;
    if (Array.isArray(addUserArr)) newObj.newUserArr = addUserArr;
    updateBug(newObj)
    await setIsModalOpen(false);
    setIsModalOpen();
  }

  const handleCancel = async () => {
    if (bugStatus.name !== bug.bug_status_id) setBugStatus({
      id: bugStatus.id,
      name: bug.bug_status.status
    });
    if (bugPriority.name !== bug.bug_priority_id) setBugPriority({
      id: bugPriority.id,
      name: bug.bug_priority.priority
    });
    await setIsModalOpen(false);
    setIsModalOpen();
  }

  return (
    <Modal 
      closeIcon
      open={isModalOpen}
      className={styles.bugModal}
      centered={true}
      size={"fullscreen"}
      trigger={
        <Table.Row>
          <Table.Cell>{bug.bug}</Table.Cell>
          <Table.Cell>{`${bug.poster.first_name} ${bug.poster.last_name}`}</Table.Cell>
          <Table.Cell>{bugStatus.name}</Table.Cell>
          <Table.Cell>{dateFormat || '-'}</Table.Cell>
        </Table.Row>
      }
    >
      <Modal.Header>Bug Ticket {bug.id}</Modal.Header>
      <Modal.Content>
        <h2>Issue: {bug.bug}</h2>
        <h3>Poster: {`${bug.poster.first_name} ${bug.poster.last_name}`}</h3>
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
            isSearching === false ? setIsSearching(true) : setIsSearching(false);
          }}
        />
        {isSearching && 
          <Dropdown
            placeholder="Search Users"
            search 
            multiple
            selection
            options={userSearchArr}
            onChange={handleUserSearchChange}
          />}
        <h2>
          Status: {bugStatus.name}
          <Dropdown>
            <Dropdown.Menu>
              <Dropdown.Header content='Change status' />
              <Dropdown.Divider />
              <Dropdown.Item 
                label={{ color: 'red', empty: true, circular:true }}
                text='Closed'
                onClick={() => { setBugStatus({
                  id: 1,
                  name: 'Closed',
                })}}
              />
              <Dropdown.Item 
                label={{ color: 'yellow', empty: true, circular:true }}
                text='In-Progress'
                onClick={() => { setBugStatus({
                  id: 2,
                  name: 'In-Progress'
                })}}
              />
              <Dropdown.Item 
                label={{ color: 'green', empty: true, circular:true }}
                text='Fixed'
                onClick={() => { setBugStatus({
                  id: 3,
                  name: 'Fixed'
                })}}
              />
            </Dropdown.Menu>
          </Dropdown>
        </h2>
        <h2>
          Priority: {bugPriority.name}
          <Dropdown>
            <Dropdown.Menu
              onChange={() => console.log('?????')}
            >
              <Dropdown.Header content='Change priority' />
              <Dropdown.Divider />
              <Dropdown.Item 
                label={{ color: 'red', empty: true, circular:true }}
                text='High'
                onClick={() => { setBugPriority({
                  id: 1,
                  name: "High"
                })}}
              />
              <Dropdown.Item 
                label={{ color: 'yellow', empty: true, circular:true }}
                text='Medium'
                onClick={() => { setBugPriority({
                  id: 2,
                  name: "Medium"
                })}}
              />
              <Dropdown.Item 
                label={{ color: 'green', empty: true, circular:true }}
                text='Low'
                onClick={() => { setBugPriority({
                  id: 3,
                  name: "Low"
                })}}
              />
            </Dropdown.Menu>
          </Dropdown>
        </h2>
        <BugCommentComponent 
          bugId={bug.id}
        />
        {/* <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
          {props.mapComments(bugComments)}
        </Comment.Group>
        <Form reply onSubmit={handleCommentSubmit}>
          <Form.TextArea 
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button 
            content='Add Reply' 
            labelPosition='left' 
            icon='edit' 
            primary  
          />
        </Form> */}
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
    </Modal>
  );
};

export default BugModal;