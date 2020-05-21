import React, { useState, useEffect } from 'react';
import { Modal, Icon, Button, Input } from "semantic-ui-react";
import styles from "./BasicUserEditModal.module.scss";
import { useAuth } from '../../context/auth';
import { getPositions, getCompanies, postUserData, validateEmail } from '../../actions';

const BasicUserEditModal = (props) => {
  const modalContent = props.modalContent
  const { authTokens } = useAuth();
  const [changeType] = useState(props.changeType);
  const [changeData, setChangeData] = useState("");
  const [lastName, setLastName] = useState("");
  const [dropDownData, setDropDownData] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [setFuncName, setSetFuncName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState();

  useEffect(() => {
    if (changeType === "company"){
      getCompanies().then(response => setDropDownData(response));
    }
    if (changeType === "position"){
      getPositions().then(response => setDropDownData(response));
    }
  }, [changeType])

  const handleSubmit = () => {
    let data = {
      userId: authTokens.id,
      changeType
    };
    if (changeType === "name"){
      if (!changeData || !lastName) {
        setIsError(true);
        setErrorMsg("Please fill in all fields");
        return
      } else {
        data.firstName = changeData;
        data.lastName = lastName;
        props.setFunc(`${changeData} ${lastName}`)
      }
    } else if (changeType === "email"){
      if (!validateEmail(changeData)){
        setIsError(true);
        setErrorMsg("Please enter a valid email");
        return
      } else {
        data.email = changeData;
        props.setFunc(changeData)
      }
    } else {
      if (!changeData) {
        setIsError(true);
        setErrorMsg("Please make a selection before submitting");
        return
      } else {
        data.dataId = changeData;
        props.setFunc(setFuncName);
      }
    }
    postUserData(data);
    setIsModalOpen(false);
  }

  return (
    <Modal
      closeIcon
      open={isModalOpen}
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
            {modalContent[0]} <select onChange={(e) => { 
              let index = e.nativeEvent.target.selectedIndex;
              setChangeData(e.target.value)
              setSetFuncName(e.nativeEvent.target[index].text)
            }}>
              <option></option>
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
            {modalContent[0]} <select onChange={(e) => {
              let index = e.nativeEvent.target.selectedIndex;
              setChangeData(e.target.value);
              setSetFuncName(e.nativeEvent.target[index].text)
            }}>
              <option></option>
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
        {isError && <div className="ui negative message">
          <i className="close icon" onClick={() => {setIsError(false)}}></i>
          <div className="header">
            {errorMsg}
          </div>
        </div>}
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