import React, { useState } from 'react';
import { Modal, Button, Input, Menu } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
import { useAuth } from "../../context/auth";
import { usePageData } from "../../context/pageData";
import { postProject, getUserData } from "../../actions";

const ProjectAddModal = () => {
  const { userData, setUserData } = usePageData();
  const { authTokens } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState();

  const handleSubmit = async () => {
    const user = userData.data;
    if (!projectName) {
      setIsError(true);
      setErrorMsg("Please enter a name for your project");
      return;
    };
    let finalDueDate = dueDate === "" ? null : dueDate;
    let newProjectData = {
      name: projectName,
      project_creator_id: user.id,
      project_status_id: 1,
      due_date: finalDueDate
    };
    postProject(newProjectData)
    .then(response => {
      if (response.status === 200){
        getUserData({ data: authTokens })
        .then(response => {
          setUserData(response);
        });
      }
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
          content="Submit a Project"
        />
      }
    >
      <Modal.Header>Start a new project</Modal.Header>
      <Modal.Content>
        <span>Project Title:</span><br/>
        <Input 
          value={projectName}
          onChange={(e, { value }) => setProjectName(value)}
        /><br/>
        <span>Due Date (if any):</span>
        <DateInput
          name="date"
          dateFormat="MM-DD-YYYY"
          placeholder="Date"
          value={dueDate}
          iconPosition="right"
          onChange={(e, { value }) => setDueDate(value)}
        />
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

export default ProjectAddModal;