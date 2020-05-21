import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './EmptyTableReplacement.module.scss'

const EmptyTableReplacement = (props) => {
  let msg = "";
  let icon = "";
  if (props.tableType === "dueToday"){
    msg = "Nothing is due today!";
    icon = "file alternate outline";
  }
  if (props.tableType === "overdue"){
    msg = "Nothing is overdue. Good job!";
    icon = "thumbs up outline";
  }
  if (props.tableType === "myBugs"){
    msg = "Add a bug and you can track it here.";
    icon="bug";
  }
  if (props.tableType === "projectUsers"){
    msg = "Click on a bug to add users.";
    icon = "users";
  }
  if (props.tableType === "projects"){
    msg = "Start a project from the dashboard.";
    icon = "pied piper";
  }
  return (
    <div className={styles.EmptyTableReplacement}>
      <Icon className={styles.icon} size="massive" name={icon} />
      <br/><br/>
      <p>{msg}</p>
    </div>
  );
};

export default EmptyTableReplacement;