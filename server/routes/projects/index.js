const express = require("express");
const projectRouter = express.Router();
const Project = require("../../database/models/Project")

projectRouter.route("/")
  .get((req, res) => {
    Project.query()
    .withGraphFetched("project_creator")
    .withGraphFetched("company")
    .withGraphFetched("bugs.[users]")
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
  })

module.exports = projectRouter;