import React, { useState } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import { Modal, Button, Input, Form, Menu } from 'semantic-ui-react'
import { useAuth } from '../../context/auth';
import { postBug, getCurrentProjectData } from '../../actions';
import { usePageData } from '../../context/pageData';
import StatusPriorityDropdown from '../StatusPriorityDropdownComponent';

const ProjectBugAddModal = (props) => {
  const { authTokens } = useAuth();
  const { currentProjectData, setCurrentProjectData } = usePageData();
  const [bugName, setBugName] = useState("");
  const [bugPriority, setBugPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!bugName) {
      setIsError(true);
      setErrorMsg("Please add a name.");
      return
    };
    if (!bugPriority.id) {
      setIsError(true);
      setErrorMsg("Please add a priority level.");
      return
    };
    let newBugData = {
      bug: bugName,
      bug_description: bugDescription,
      poster_id: authTokens.id,
      project_id: currentProjectData.data.id,
      bug_status_id: 2,
      bug_priority_id: bugPriority.id,
      due_date: dueDate === "" ? null : dueDate
    }
    postBug(newBugData)
    .then(() => {
      let projectId = currentProjectData.data.id
      getCurrentProjectData({ projectId, authTokens })
      .then(response => {
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
        <Menu.Item 
          content="Submit a Bug"
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
        /><br/>
        <span>Set Priority: {bugPriority.name}</span>
        <StatusPriorityDropdown 
          setFunc={setBugPriority}
          items={["High", "Medium", "Low"]}
        /><br/><br/>
        <span>Bug Description:</span>
        <Form>
          <Form.TextArea 
            value={bugDescription}
            onChange={(e, { value }) => setBugDescription(value)}
          />
        </Form>
        {isError && <div className="ui negative message">
          <i className="close icon" onClick={() => {setIsError(false)}}></i>
          <div className="header">
            {errorMsg}
          </div>
        </div>}
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