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

bugRouter.post("/update", (req, res) => {
  const updateInfo = req.body;
  // console.log(updateInfo);
  const feed = client.feed('projectFeed', updateInfo.projectId);

  // feed.addActivity({
  //   'actor': client.user(userId).ref(),
  //   'verb': 'stab',
  //   'object': 'yo',
  // })
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
  if (updateInfo.status){
    Bug.query()
    .findById(updateInfo.bug_id)
    .patch({ bug_status_id: updateInfo.status })
    .then(() => {
      feed.addActivity({
        'actor': client.user(updateInfo.id).ref(),
        'verb': 'update',
        'object': 'has changed the status of a bug',
      })
    })
    .catch(err => (
      console.log(err)
    ))
  }
  if (updateInfo.priority){
    Bug.query()
    .findById(updateInfo.bug_id)
    .patch({ bug_priority_id: updateInfo.priority })
    .then(() => {
      feed.addActivity({
        'actor': client.user(updateInfo.id).ref(),
        'verb': 'update',
        'object': 'has updated the priority of a bug',
      })
    })
    .catch(err => (
      console.log(err)
    ))
  }
  res.sendStatus(200);
})

module.exports = bugRouter;