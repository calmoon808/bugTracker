import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'semantic-ui-react';
import BugModal from '../BugModalComponent/BugModal';
import EmptyTableReplacement from '../EmptyTableReplacementComponent'
import { sortBy, map } from 'lodash'

const BugTableComponent = (props) => {
  const [cleanBugs, setCleanBugs] = useState();
  const [sortData, setSortData] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const [isTableEmpty, setIsTableEmpty] = useState(false);
  
  useEffect(() => {
    const bugs = props.data.bugs;
    if (bugs.length > 0) setIsTableEmpty(false);
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
        data: sortBy(data, (o) => {
          if (typeof o[clickedColumn] === "number") {
            return o[clickedColumn];
          }
          return o[clickedColumn].toLowerCase();
        }),
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

  const mapBugs = async (bugs) => {
    const type = props.type;
    let today = new Date(Date.now()).setHours(0,0,0,0);
    let cleanBugArr = [];
    let bugsFiltered = bugs;
    if(type === "dueToday"){
      bugsFiltered = bugs.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) === today)
    };
    if (type === "overdue"){
      bugsFiltered = bugs.filter(bug => {
        return ((new Date(bug.due_date).setHours(0,0,0,0) < today) && bug.due_date)
      })
    };
    if (bugsFiltered.length === 0) {
      await setIsTableEmpty(true);
      return;
    }
    bugsFiltered.forEach(bug => {
      const timeStampArr = !bug.due_date ? null : bug.due_date.split("T");
      const cleanObj = {
        id: bug.id,
        bug: bug.bug,
        description: bug.bug_description,
        posterFullName: `${bug.poster.first_name} ${bug.poster.last_name}`,
        priority: bug.bug_priority.priority,
        priority_id: bug.bug_priority.id,
        status: bug.bug_status.status,
        status_id: bug.bug_status.id,
        startDate: bug.created_at.split("T")[0],
        dueDate: !bug.due_date ? "n/a" : timeStampArr[0],
        projectId: bug.project_id,
        comments: bug.comments,
        users: bug.users
      }
      cleanBugArr.push(cleanObj);
    });
    setCleanBugs(cleanBugArr);
  }

  const mapCleanBugs = (bugs) => {
    const { data } = bugs;
    return map(data, (bug) => {
      return (
        <Modal
          key={bug.id}
          closeIcon
          open={isModalOpen}
          centered={true}
          trigger={
            <Table.Row key={bug.id}>
              <Table.Cell>{bug.id}</Table.Cell>
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
            setCurrentProjectData={props.setCurrentProjectData}
            setUserData={props.setUserData}
          />
        </Modal>
      )
    })
  }

  return (
    <>
      {isTableEmpty ? 
        <EmptyTableReplacement
          tableType={props.type}
        /> 
        : 
        <Table celled inverted selectable sortable>
          <Table.Header>
            <Table.Row key={'header'}>
              {cleanBugs && mapHeaders(props.headers)}
            </Table.Row>
          </Table.Header>
    
          <Table.Body>
            {cleanBugs && mapCleanBugs(sortData)}
          </Table.Body>
        </Table>
      }
    </>
  );
};

export default BugTableComponent;