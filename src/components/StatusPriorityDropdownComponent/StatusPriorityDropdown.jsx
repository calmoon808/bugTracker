import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const StatusPriorityDropdown = (props) => {
  return (
    <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Item 
          label={{ color: 'red', empty: true, circular:true }}
          text={props.items[0]}
          onClick={() => { props.setFunc({
            id: 3,
            name: props.items[0],
          })}}
        />
        <Dropdown.Item 
          label={{ color: 'yellow', empty: true, circular:true }}
          text={props.items[1]}
          onClick={() => { props.setFunc({
            id: 2,
            name: props.items[1]
          })}}
        />
        <Dropdown.Item 
          label={{ color: 'green', empty: true, circular:true }}
          text={props.items[2]}
          onClick={() => { props.setFunc({
            id: 1,
            name: props.items[2]
          })}}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default StatusPriorityDropdown;