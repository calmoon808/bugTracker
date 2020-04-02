import React from 'react';

const TicketDisplay = (props) => {
  return (
    <div>
      <h1>{props.description}</h1>
      <p>{props.project}</p>
      <p>{props.poster}</p>
      <p>{props.bug_status}</p>
      <p>{props.bug_priority}</p>
    </div>
  );
}

export default TicketDisplay;