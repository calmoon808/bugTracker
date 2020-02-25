const express = require("express");
const projectRouter = express.Router();
const Project = require("../../database/models/Project")

projectRouter.route("/")
  .get((req, res) => {
    Project.query()
      .then(projects => {
        res.json(projects);
      })
  })

module.exports = projectRouter;