const express = require("express");
const projectRouter = express.Router();
const Project = require("../../database/models/Project")

projectRouter.route("/")
  .get((req, res) => {
    Project.query()
    .withGraphFetched("project_creator")
    .withGraphFetched("company")
    .withGraphFetched("bugs.[users, poster]")
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
  })

projectRouter.post("/dashboard", (req, res) => {
  let projectId = req.body.projectId.id;
  if (typeof projectId === 'string') projectId = JSON.parse(projectId);
  Project.query()
  .findById(projectId)
  .withGraphFetched("company")
  .withGraphJoined("bugs.[users.[company, company_position], poster, bug_status]")
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
})
module.exports = projectRouter;