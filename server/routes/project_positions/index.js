const express = require("express");
const projectPositionRouter = express.Router();
const ProjectPosition = require("../../database/models/ProjectPosition")

projectPositionRouter.route("/")
  .get((req, res) => {
    ProjectPosition.query()
      .then(projectPositions => {
        res.json(projectPositions);
      })
  })

module.exports = projectPositionRouter;