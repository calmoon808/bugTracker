import React, { useState } from 'react';
import { Modal, Button, Input } from "semantic-ui-react";
import styles from "./PasswordChangeModal.module.scss";
import { useAuth } from "../../context/auth";
import { checkPassword, changePassword } from "../../actions";

const PasswordChangeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordMatched, setOldPasswordMatched] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { authTokens } = useAuth();

  const handleNext = async (e, {value}) => {
    let passwordMatch;
    await checkPassword({
      oldPassword,
      userId: authTokens.id
    })
    .then(response => {
      passwordMatch = response;
    })
    if (passwordMatch) {
      setOldPasswordMatched(true);
    } else {
      setIsError(true);
      setErrorMsg("Wrong Passwor");
    };
  };

  const handleSubmit = async () => {
    setIsModalOpen(false);
    if (newPassword !== newPasswordConfirm) {
      setIsError(true);
      setErrorMsg("passwords do not match");
      return false;
    }
    await changePassword({
      newPassword,
      userId: authTokens.id
    });
    alert("Password successfully changed.")
  };

  return (
    <Modal
      closeIcon
      open={isModalOpen}
      centered={true}
      trigger={
        <Button className={styles.accountButton}>Change Password</Button>
      }
      onClose={() => {
        setIsError(false)
        setOldPasswordMatched(false)
      }}
    >
      <Modal.Header>Change Password</Modal.Header>
      {oldPasswordMatched ? 
        <>
          <Modal.Content>
            <span>
              {"New Password: "} <Input 
                key="newpw1"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {"Confirm New Password: "} <Input
                key="newpw2" 
                type="password"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
              />
            </span>
            {isError && <div className="ui negative message">
              <i className="close icon" onClick={() => setIsError(false)}></i>
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
        </>
      : 
        <>
          <Modal.Content>
            <span>{"Old Password: "} <Input 
              key="oldpw"
              type="password"
                onChange={(e) => setOldPassword(e.target.value)}
            /></span>
            {isError && <div className="ui negative message">
              <i className="close icon" onClick={() => setIsError(false)}></i>
              <div className="header">
                {errorMsg}
              </div>
            </div>}
          </Modal.Content>
          <Modal.Actions>
            <Button
              positive
              icon='arrow right'
              labelPosition='right'
              content='Next'
              onClick={handleNext}
            />
          </Modal.Actions>
        </>
      }
    </Modal>
  );
};

export default PasswordChangeModal;