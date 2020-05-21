import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'semantic-ui-react';
import UserModal from '../UserModalComponent';
import EmptyTableReplacement from '../EmptyTableReplacementComponent';
import { map, sortBy } from 'lodash'

const UserTable = (props) => {
  const [cleanUsers, setCleanUsers] = useState();
  const [sortData, setSortData] = useState();
  const [isTableEmpty] = useState(props.users.length === 0);

  useEffect(() => {
    mapUsers(props.users);
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
        position: user.company_position.name,
      }
      cleanUserData.push(newObj);
    })
    setCleanUsers(cleanUserData);
  }

  const mapCleanUsers = (users) => {
    const { data } = sortData;
    return map(data, ({ id, userFullName, position, email }) => {
      return (
        <Modal
          key={id}
          basic
          size="tiny"
          trigger={
            <Table.Row key={id}>
              <Table.Cell>{userFullName}</Table.Cell>
              <Table.Cell>{position}</Table.Cell>
            </Table.Row>
          }
        >
          <UserModal
            key={id}
            name={userFullName}
            email={email}
          />
        </Modal>
      )
    })
  }

  return (
    <>
      {isTableEmpty ? 
        <EmptyTableReplacement 
          tableType="projectUsers"
        />
      :
      <Table celled inverted selectable sortable>
        <Table.Header>
          <Table.Row key={'header'}>
            {mapHeaders(props.headers)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cleanUsers && mapCleanUsers(cleanUsers)}
        </Table.Body>
      </Table>}
    </>
  );
}

export default UserTable;