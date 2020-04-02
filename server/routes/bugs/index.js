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

module.exports = bugRouter;