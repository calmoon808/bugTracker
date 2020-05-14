import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'semantic-ui-react';
import BugModal from '../BugModalComponent/BugModal';
import { sortBy, map } from 'lodash'

const BugTableComponent = (props) => {
  const [cleanBugs, setCleanBugs] = useState();
  const [sortData, setSortData] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  
  useEffect(() => {
    const bugs = props.data.bugs;
    mapBugs(bugs);
    // eslint-disable-next-line
  }, [props]);

  useEffect(() => {
    setSortData({
      column: null,
      data: cleanBugs,
      direction: null
    })
  }, [cleanBugs])
  
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

  const mapBugs = (bugs) => {
    const type = props.type;
    let today = new Date(Date.now()).setHours(0,0,0,0);
    let userArr = []
    let cleanBugArr = [];
    let bugsFiltered = bugs;
    if(type === "dueToday"){
      bugsFiltered = bugs.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) === today)
    };
    if (type === "overdue"){
      bugsFiltered = bugs.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) < today)
    };
    bugsFiltered.forEach(bug => {
      userArr = mapUsers(bug.users);
      const timeStampArr = bug.due_date.split("T");
      let projectId = bug.project ? bug.project.id : props.projectId;
      const cleanObj = {
        id: bug.id,
        bug: bug.bug,
        posterFullName: `${bug.poster.first_name} ${bug.poster.last_name}`,
        prioity: bug.bug_priority.prioity,
        status: bug.bug_status.status,
        dueDate: timeStampArr[0],
        userArr: userArr,
        projectId: projectId
      }
      const bugObj = Object.assign(cleanObj, bug);
      cleanBugArr.push(bugObj);
    });
    setCleanBugs(cleanBugArr);
  }

  const mapCleanBugs = (bugs) => {
    const { data } = sortData;
    return map(data, (bug) => {
      return (
        <Modal
          key={bug.id}
          closeIcon
          open={isModalOpen}
          centered={true}
          trigger={
            <Table.Row key={bug.id}>
              <Table.Cell>{bug.bug}</Table.Cell>
              <Table.Cell>{bug.posterFullName}</Table.Cell>
              <Table.Cell>{bug.status}</Table.Cell>
              <Table.Cell>{bug.dueDate}</Table.Cell>
            </Table.Row>
          }
        >
          <BugModal 
            key={bug.id}
            bug={bug}
            setIsModalOpen={setIsModalOpen}
            projectId={bug.projectId}
            setCurrentProjectData={props.setCurrentProjectData}
            setUserData={props.setUserData}
          />
        </Modal>
      )
    })
  }

  const mapUsers = (userArr) => {
    if (userArr === undefined) { return false }
    let newUserArr = [];
    userArr.forEach(user => {
      let obj = {
        key: user.id,
        text: `${user.first_name} ${user.last_name}`,
        value: `${user.first_name} ${user.last_name}`,
        onClick: () => {console.log('yoyo')}
        // image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
      };
      newUserArr.push(obj);
    })
    return newUserArr;
  }

  return (
    <Table celled inverted selectable sortable>
      <Table.Header>
        <Table.Row key={'header'}>
          {mapHeaders(props.headers)}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {cleanBugs && mapCleanBugs(cleanBugs)}
      </Table.Body>
    </Table>
  );
};

export default BugTableComponent;