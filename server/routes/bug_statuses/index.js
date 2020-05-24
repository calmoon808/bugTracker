const express = require("express");
const bugStatusRouter = express.Router();
const bugStatus = require("../../database/models/BugStatus")

bugStatusRouter.route("/")
  .get((req, res) => {
    bugStatus.query()
      .then(bugStatuses => {
        res.json(bugStatuses);
      })
  })

module.exports = bugStatusRouter;