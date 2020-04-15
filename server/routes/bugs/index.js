const express = require("express");
const bugRouter = express.Router();
const Bug = require("../../database/models/Bug")

bugRouter.route("/")
  .get((req, res) => {
    Bug.query()
    .withGraphFetched('poster')
    .withGraphFetched('project')
    .withGraphFetched('bug_status')
    .withGraphFetched('bug_priority')
    .then(bugs => {
      res.json(bugs);
    })
  })

bugRouter.post("/count", (req, res) => {
  const body = req.body;
  Bug.query()
  .withGraphFetched('users')
  .where('users.id', '=', body.data.id)
  .withGraphJoined('bug_status')
  .where('bug_status.status', '=', body.group)
  .then(bugs => {
    res.json(bugs);
  })
})

module.exports = bugRouter;