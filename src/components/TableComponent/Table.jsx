import React from 'react';
import { Table } from 'semantic-ui-react';

const TableComponent = (props) => {
  const mapBugs = () => {
    if (props.data === undefined) { return false };
    return props.data.bugs.map(bug => {
      return (
        <Table.Row key={bug.id}>
          <Table.Cell>{bug.bug}</Table.Cell>
          <Table.Cell>{`${bug.poster.first_name} ${bug.poster.last_name}`}</Table.Cell>
          <Table.Cell>{bug.bug_status.status}</Table.Cell>
          <Table.Cell>{bug.due_date || '-'}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Table celled inverted selectable>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Poster</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Due Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {mapBugs()}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;