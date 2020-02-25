const express = require("express");
const bugPriorityRouter = express.Router();
const bugPriority = require("../../database/models/BugPriority")

bugPriorityRouter.route("/")
  .get((req, res) => {
    bugPriority.query()
      .then(bugPriorities => {
        res.json(bugPriorities);
      })
  })

module.exports = bugPriorityRouter;