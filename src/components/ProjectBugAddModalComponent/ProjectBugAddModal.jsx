import React, { useState } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import { Modal, Button, Input, Form, Dropdown, Menu } from 'semantic-ui-react'
import { useAuth } from '../../context/auth';
import { postBug, getCurrentProjectData } from '../../actions';
import { usePageData } from '../../context/pageData';

const ProjectBugAddModal = (props) => {
  const { authTokens } = useAuth();
  const { setCurrentProjectData } = usePageData();
  const [bugName, setBugName] = useState("");
  const [bugPriority, setBugPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState();

  const handleSubmit = async () => {
    let newBugData = {
      bug: bugName,
      bug_description: bugDescription,
      poster_id: authTokens.id,
      project_id: parseInt(props.projectId.id),
      bug_status_id: 2,
      bug_priority_id: bugPriority.id,
      due_date: dueDate === "" ? null : dueDate
    }
    postBug(newBugData)
    .then(() => {
      let projectId = props.projectId
      getCurrentProjectData({ projectId: projectId.id, authTokens })
      .then(response => {
        console.log(response)
        setCurrentProjectData(response)
      });
    });
    await setIsModalOpen(false);
    setIsModalOpen();
  }

  const handleCancel = async () => {
    await setIsModalOpen(false);
    setIsModalOpen();
  }

  return (
    <Modal
      closeIcon
      open={isModalOpen}
      trigger={
        <Button
          color="black"
          content="New Bug"
          floated="right"
        />
      }
    >
      <Modal.Header>Submit a Bug</Modal.Header>
      <Modal.Content>
        <span>Bug Name:</span><br/>
        <Input 
          value={bugName}
          onChange={(e, { value }) => setBugName(value)}
        /><br/>
        <span>Due Date (if any):</span><br/>
        <DateInput
          name="date"
          dateFormat="MM-DD-YYYY"
          placeholder="Date"
          value={dueDate}
          iconPosition="right"
          onChange={(e, { value }) => setDueDate(value)}
        />
        <span>Set Priority:</span>
        <Menu compact borderless={true}>
          <Dropdown
            item
            text={bugPriority.name}
          >
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
        </Menu><br/>
        <span>Bug Description:</span>
        <Form>
          <Form.TextArea 
            value={bugDescription}
            onChange={(e, { value }) => setBugDescription(value)}
          />
        </Form>
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

export default ProjectBugAddModal;