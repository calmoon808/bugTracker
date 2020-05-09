import React, { useState, useEffect } from 'react';
import { Modal, Icon, Button, Input } from "semantic-ui-react";
import styles from "./BasicUserEditModal.module.scss";
import { useAuth } from '../../context/auth';
import { getPositions, getCompanies } from '../../actions';

const BasicUserEditModal = (props) => {
  const modalContent = props.modalContent
  const { authTokens } = useAuth();
  const [changeType] = useState(props.changeType);
  const [changeData, setChangeData] = useState("");
  const [lastName, setLastName] = useState("");
  const [dropDownData, setDropDownData] = useState();

  useEffect(() => {
    if (changeType === "company"){
      getCompanies().then(response => setDropDownData(response));
    }
    if (changeType === "position"){
      getPositions().then(response => setDropDownData(response));
    }
  }, [changeType])

  const handleSubmit = () => {
    console.log(changeData, lastName);
  }

  return (
    <Modal
      closeIcon
      trigger={<Icon 
        name='edit'
        value='name' 
        size='tiny' 
        className={styles.editIcon}
      />}
    >
      <Modal.Header>{`Change ${changeType}`}</Modal.Header>
      <Modal.Content>
        {modalContent.length === 2 &&
          <>
            <span>{modalContent[0]} <Input onChange={(e) => setChangeData(e.target.value)} /></  span>
            <span>{modalContent[1]} <Input onChange={(e) => setLastName(e.target.value)} /></span>
          </> 
        }
        {changeType === "email" &&
          <span>{modalContent[0]} <Input onChange={(e) => setChangeData(e.target.value)} /></  span>
        }
        {changeType === "company" &&
          <span>
            {modalContent[0]} <select onChange={(e) => setChangeData(e.target.value)}>
              {dropDownData && dropDownData.map(company => {
                return <option 
                  key={company.id} 
                  value={company.id}
              >
                {company.name}
              </option>
              })}
            </select>
          </span>
        }
        {changeType === "position" &&
          <span>
            {modalContent[0]} <select onChange={(e) => setChangeData(e.target.value)}>
              {dropDownData && dropDownData.map(position => {
                return <option 
                  key={position.id} 
                  value={position.id}
              >
                {position.name}
              </option>
              })}
            </select>
          </span>
        }
      </Modal.Content>
      <Modal.Actions>
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

export default BasicUserEditModal;