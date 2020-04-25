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

module.exports = bugRouter;