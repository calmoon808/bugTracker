const express = require("express");
const bugRouter = express.Router();
const Bug = require("../../database/models/Bug");
const UsersBugs = require("../../database/models/UsersBugs");
const client = require("../../../src/getStream");

bugRouter.route("/")
  .get((req, res) => {
    Bug.query()
    .withGraphFetched('poster')
    .withGraphFetched('project')
    .withGraphFetched('bug_status')
    .withGraphFetched('bug_priority')
    .withGraphFetched('users')
    .then(bugs => {
      res.json(bugs);
    })
  })

bugRouter.post("/count", (req, res) => {
  const body = req.body;
  if (typeof body.data === "string") body.data = JSON.parse(body.data);
  Bug.query()
  .withGraphFetched('users')
  .withGraphFetched('project')
  .where(`${body.relation}.id`, '=', body.data.id)
  .withGraphJoined('bug_status')
  .skipUndefined()
  .where('bug_status.status', '=', body.group)
  .then(bugs => {
    res.json(bugs);
  })
})

bugRouter.post("/update", async (req, res) => {
  const updateInfo = req.body;
  const projectId = typeof updateInfo.projectId === "number" ? updateInfo.projectId : updateInfo.projectId.id
  console.log(updateInfo);
  const bug = Bug.query().findById(updateInfo.bug_id)
  let bug_status_id, bug_priority_id;
  await bug.then(response => {
    bug_status_id = response.bug_status_id,
    bug_priority_id = response.bug_priority_id
  })
  const feed = client.feed('projectFeed', projectId);
  if (updateInfo.newUserArr){
    UsersBugs.query()
    .insertGraph(updateInfo.newUserArr)
    .then(() =>{
      feed.addActivity({
        'actor': client.user(updateInfo.id).ref(),
        'verb': 'update',
        'object': 'has added users to a bug',
      })
    })
    .catch(err => (
      console.log(err)
    ))
  }
  let priorityStatusUpdateObj = {};

  if (updateInfo.status !== bug_status_id){
    // console.log("status:", updateInfo.status, bug_status_id)
    priorityStatusUpdateObj.bug_status_id = updateInfo.status;
    feed.addActivity({
      'actor': client.user(updateInfo.id).ref(),
      'verb': 'update',
      'object': 'has changed the status of a bug',
    })
    .catch(err => (
      console.log(err)
    ))
  }
  if (updateInfo.priority !== bug_priority_id){
    // console.log("priority:", updateInfo.priority, bug_priority_id)
    priorityStatusUpdateObj.bug_priority_id = updateInfo.priority;
    feed.addActivity({
      'actor': client.user(updateInfo.id).ref(),
      'verb': 'update',
      'object': 'has updated the priority of a bug',
    })
    .catch(err => (
      console.log(err)
    ))
  }
  
  if (priorityStatusUpdateObj.bug_status_id || priorityStatusUpdateObj.bug_priority_id){
    bug.update(priorityStatusUpdateObj)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => (
      console.log(err)
    ))
  }
})

module.exports = bugRouter;