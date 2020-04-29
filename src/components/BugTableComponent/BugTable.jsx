import React from 'react';
import { usePageData } from "../../context/pageData";
import { Table, Modal, Button, Form, Accordion, Icon, Comment, Header } from 'semantic-ui-react';
import styles from './BugTable.module.scss';

const BugTableComponent = (props) => {
  const {showUsers, setShowUsers} = usePageData();

  const handleClick = () => {
    showUsers === false ? setShowUsers(true) : setShowUsers(false);
  }

  
  const mapHeaders = () => {
    if (props.headers === undefined) { return false };
    return props.headers.map(header => {
      return (
        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
      )
    })
  }

  const mapUsers = (userArr) => {
    console.log(userArr);
    if (userArr === undefined) { return false }
    return userArr.map(user => {
      return (
        <p key={user.id}>{`${user.first_name} ${user.last_name}`}</p>
      )
    })
  }

  const mapBugs = (type) => {
    if (props.data === undefined) { return false };
    let bugData = props.data.bugs;
    let today = new Date(Date.now());
    today = today.setHours(0, 0, 0, 0);
    if(type === "dueToday"){
      bugData = bugData.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) === today)
    };
    if (type === "overdue"){
      bugData = bugData.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) < today)
    };
    return bugData.map(bug => {
      let timeStampArr = bug.due_date.split("T");
      let dateFormat = timeStampArr[0];

      return (
        <Modal 
          closeIcon
          className={styles.bugModal}
          key={bug.id}
          centered={true}
          size={"fullscreen"}
          onClose={() => setShowUsers(false)}
          trigger={
            <Table.Row>
              <Table.Cell>{bug.bug}</Table.Cell>
              <Table.Cell>{`${bug.poster.first_name} ${bug.poster.last_name}`}</Table.Cell>
              <Table.Cell>{bug.bug_status.status}</Table.Cell>
              <Table.Cell>{dateFormat || '-'}</Table.Cell>
            </Table.Row>
          }
        >
          <Modal.Header>Bug Ticket</Modal.Header>
          <Modal.Content>
            <h2>id: {bug.id}</h2>
            <h2>Issue: {bug.bug}</h2>
            <h3>Poster: {`${bug.poster.first_name} ${bug.poster.last_name}`}</h3>
            <Accordion>
              <Accordion.Title
                active={showUsers}
                onClick={handleClick}
              >
                <Icon name='dropdown' />
                Assigned to:
              </Accordion.Title>
              <Accordion.Content
                active={showUsers}
              >
                {mapUsers(bug.users)}
              </Accordion.Content>
            </Accordion>
            <h2>Status: {bug.bug_status.status}</h2>
            <h2>Priority: {bug.bug_priority.priority}</h2>
            <Comment.Group>
              <Header as='h3' dividing>
                Comments
              </Header>
            </Comment.Group>
            <Form reply>
              <Form.TextArea />
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>Cancel</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Submit'
            />
          </Modal.Actions>
        </Modal>
      )
    })
  }

  return (
    <Table celled inverted selectable>
      <Table.Header>
        <Table.Row key={'header'}>
          {mapHeaders()}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {mapBugs(props.type)}
      </Table.Body>
    </Table>
  );
};

export default BugTableComponent;