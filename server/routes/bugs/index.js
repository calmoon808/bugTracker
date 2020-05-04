const express = require("express");
const bugRouter = express.Router();
const Bug = require("../../database/models/Bug");
const UsersBugs = require("../../database/models/UsersBugs");

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
  if (updateInfo.newUserArr){
    UsersBugs.query()
    .insertGraph(updateInfo.newUserArr)
    .catch(err => (
      console.log(err)
    ))
  }
  if (updateInfo.status){
    Bug.query()
    .findById(updateInfo.bug_id)
    .patch({ bug_status_id: updateInfo.status })
    .catch(err => (
      console.log(err)
    ))
  }
  if (updateInfo.priority){
    Bug.query()
    .findById(updateInfo.bug_id)
    .patch({ bug_priority_id: updateInfo.priority })
    .catch(err => (
      console.log(err)
    ))
  }
  res.sendStatus(200);
})

module.exports = bugRouter;