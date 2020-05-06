import React from 'react';
import { Table } from 'semantic-ui-react';
import BugModal from '../BugModalComponent/BugModal';

const BugTableComponent = (props) => {
  const mapHeaders = () => {
    if (props.headers === undefined) { return false };
    return props.headers.map(header => {
      return (
        <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
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

  const mapBugs = (type) => {
    if (props.data === undefined) { return false };
    let bugData = props.data.bugs;
    let today = new Date(Date.now());
    today = today.setHours(0, 0, 0, 0);
    if(type === "dueToday"){
      bugData = bugData.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) === today)
    };
    if (type === "overdue"){
      bugData = bugData.filter(bug => new Date(bug.due_date).setHours(0,0,0,0) < today)
    };
    return bugData.map(bug => {
      let userArr = mapUsers(bug.users);
      return (
        <BugModal 
          key={bug.id}
          bug={bug}
          userArr={userArr}
        />
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

export default BugTableComponent;