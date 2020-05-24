import React from 'react';
import { Modal, Button } from "semantic-ui-react";
import styles from "./ProfilePicChangeModal.module.scss";
// import { useAuth } from "../../context/auth";

const PasswordChangeModal = () => {
  // const [isModalOpen, setIsModalOpen] = useState();

  return (
    <Modal
      closeIcon
      // open={isModalOpen}
      centered={true}
      trigger={
        <Button disabled={true} className={styles.accountButton}>Change Photo</Button>
      }
    >
      
    </Modal>
  );
};

export default PasswordChangeModal;