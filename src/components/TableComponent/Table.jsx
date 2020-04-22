import React from 'react';
import { Table } from 'semantic-ui-react';

const TableComponent = (props) => {
  const mapHeaders = () => {
    if (props.headers === undefined) { return false };
    return props.headers.map(header => {
      return (
        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
      )
    })
  }

  const mapBugs = (type) => {
    if (props.data === undefined) { 
      console.log(props.data)
      return false
    };
    let bugData = props.data.bugs;
    let today = new Date(Date.now());
    today = today.setHours(0, 0, 0, 0);
    if(type === "dueToday"){
      bugData = bugData.filter(bug => new Date(bug.due_date).setHours(0, 0, 0, 0) === today)
    }
    if (type === "overdue"){
      bugData = bugData.filter(bug => new Date(bug.due_date).setHours(0, 0, 0, 0) < today)
    }
    return bugData.map(bug => {
      let timeStampArr = bug.due_date.split("T")
      let dateFormat = timeStampArr[0];
      // let timeFormat = timeStampArr[1];

      return (
        <Table.Row key={bug.id}>
          <Table.Cell>{bug.bug}</Table.Cell>
          <Table.Cell>{`${bug.poster.first_name} ${bug.poster.last_name}`}</Table.Cell>
          <Table.Cell>{bug.bug_status.status}</Table.Cell>
          <Table.Cell>{dateFormat || '-'}</Table.Cell>
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
        {mapBugs(props.type)}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;