import React, { useState } from 'react';
import { Modal, Button, Input, Dropdown, Menu } from 'semantic-ui-react';
import { DateInput } from "semantic-ui-calendar-react";
import { useAuth } from "../../context/auth";
import { usePageData } from "../../context/pageData";
import { postProject, getUserData } from "../../actions";

const yesNo = [
  { key: 1, text: 'Yes', value: true },
  { key: 2, text: 'No', value: false }
]

const ProjectAddModal = () => {
  const { userData, setUserData } = usePageData();
  const { authTokens } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompany, setIsCompany] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = () => {
    const user = userData.data;
    if (!projectName) {
      setIsError(true);
      setErrorMsg("Please enter a name for your project");
      return;
    };
    if (isCompany === undefined) {
      setIsError(true);
      setErrorMsg("Please specify if your project is a personal one.");
      return;
    };
    let companyId = isCompany ? user.company.id : 1;
    let finalDueDate = dueDate === "" ? null : dueDate;
    let newProjectData = {
      name: projectName,
      project_creator_id: user.id,
      company_id: companyId,
      project_status_id: 1,
      due_date: finalDueDate
    };
    postProject(newProjectData)
    .then(response => {
      if (response.status === 200){
        // axios.post("/users/dashboard", { data: authTokens })
        getUserData({ data: authTokens })
        .then(response => {
          setUserData(response);
        });
      }
    })
  }

  return (
    <Modal
      closeIcon
      trigger={
        <Button
          color="black"
          content="New Project"
          floated="right"
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
        <span>Is this a company project?</span>
        <Menu compact borderless={true}>
          <Dropdown
            simple 
            item
            options={yesNo}
            onChange={(e, { value }) => setIsCompany(value)}
          />
        </Menu><br/><br/>
        {isCompany && <span>
          
        </span>}
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
          // onClick={handleCancel}
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