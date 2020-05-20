import React, { useState } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { changeBugDescription, findBug } from '../../actions';

const BugDescriptionForm = (props) => {
  const bug = props.bug;
  const [description, setDescription] = useState(bug.description);
  const [newDescription, setNewDescription] = useState("");
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);

  const handleDescriptionSubmit = () => {
    changeBugDescription({
      newDescription: newDescription,
      bugId: bug.id,
      project_id: bug.projectId
    })
    .then(() => {
      findBug({ bugId: bug.id })
      .then(response => {
        setDescription(response.bug_description);
        setShowDescriptionInput(false);
      })
    })
  }

  return (
    <>
      <h3>Description: {description ? 
        <Icon 
          name="pencil"
          onClick={() => showDescriptionInput ? setShowDescriptionInput(false) : setShowDescriptionInput(true)}
        /> 
        : 
        <Icon 
          name="plus circle"
          onClick={() => showDescriptionInput ? setShowDescriptionInput(false) : setShowDescriptionInput(true)}
        />}
      </h3>
      {(!showDescriptionInput && description) && <p>{description}</p>}
      {showDescriptionInput && <Form onSubmit={handleDescriptionSubmit}>
        <Form.TextArea 
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button 
            content='Change Description' 
            primary  
          />
      </Form>}
    </>
  );
};

export default BugDescriptionForm;