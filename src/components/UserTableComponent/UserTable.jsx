import React from 'react';
import { Table } from 'semantic-ui-react';

function UserTable(props) {
  console.log(props);
  const mapHeaders = () => {
    if (props.headers === undefined) { return false };
    return props.headers.map(header => {
      return (
        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
      )
    })
  }

  const mapUsers = () => {
    if (props.data === undefined) { return false };
    if (props.data.length === 1) { return false };
    let userData = props.data;

    return userData.map(user => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell>{`${user.first_name} ${user.last_name}`}</Table.Cell>
          <Table.Cell>{user.company_position.name}</Table.Cell>
          <Table.Cell>{user.company.name}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Table celled inverted selectable>
      <Table.Header>
        <Table.Row key={'header'}>
          {mapHeaders()}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {mapUsers()}
      </Table.Body>
    </Table>
  );
}

export default UserTable;