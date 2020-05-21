import React from 'react';
import { Image, Card, Modal } from 'semantic-ui-react';
import profilePlaceholderImg from '../../imgs/blue.png';

const UserModal = (props) => {
  const { name, email } = props
  return (
    <Modal.Content>
      <Card>
        <Image src={profilePlaceholderImg} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Description>{email}</Card.Description>
        </Card.Content>
      </Card>
    </Modal.Content>
  );
};

export default UserModal;