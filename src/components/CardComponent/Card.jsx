import React from 'react';
import { Card } from 'semantic-ui-react';

const CardComponent = (props) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
      </Card.Content>
      <Card.Content>{props.div}</Card.Content>
    </Card>
  );
}

export default CardComponent;