import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { map, sortBy } from 'lodash'

const UserTable = (props) => {
  const [cleanUsers, setCleanUsers] = useState();
  const [sortData, setSortData] = useState();

  useEffect(() => {
    if (props.users.length > 0) mapUsers(props.users);
    // eslint-disable-next-line
  }, [props])

  useEffect(() => {
    setSortData({
      column: null,
      data: cleanUsers,
      direction: null
    })
  }, [cleanUsers])

  const handleSort = (clickedColumn) => () => {
    const { column, data, direction } = sortData;
    if (column !== clickedColumn) {
      setSortData({
        column: clickedColumn,
        data: sortBy(data, (o) => o[clickedColumn].toLowerCase()),
        direction: 'ascending',
      });
      return;
    };

    setSortData({
      column: column,
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  const mapHeaders = (headers) => {
    if (!sortData) return;
    const { column, direction } = sortData;
    return headers.map(header => {
      return (
        <Table.HeaderCell
          key={header[0]}
          sorted={column === header[1] ? direction : null}
          onClick={handleSort(header[1])}
        >
          {header[0]}
        </Table.HeaderCell>
      )
    })
  }

  const mapUsers = async (users) => {
    let cleanUserData = [];
    users.forEach(user => {
      let newObj = {
        id: user.id,
        userFullName: `${user.first_name} ${user.last_name}`,
        email: user.email,
        company: user.company.name,
        position: user.company_position.name,
      }
      cleanUserData.push(newObj);
    })
    setCleanUsers(cleanUserData);
  }

  const mapCleanUsers = (users) => {
    const { data } = sortData;
    return map(data, ({ id, userFullName, company, position }) => {
      return (
        <Table.Row key={id}>
          <Table.Cell>{userFullName}</Table.Cell>
          <Table.Cell>{position}</Table.Cell>
          <Table.Cell>{company}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Table celled inverted selectable sortable>
      <Table.Header>
        <Table.Row key={'header'}>
          {mapHeaders(props.headers)}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cleanUsers && mapCleanUsers(cleanUsers)}
      </Table.Body>
    </Table>
  );
}

export default UserTable;