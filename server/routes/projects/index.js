const express = require("express");
const projectRouter = express.Router();
const Project = require("../../database/models/Project");
const client = require("../../../src/getStream");

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

projectRouter.post("/setCookie", (req, res) => {
  let projectToken = client.createUserToken(req.body.projectId.toString());
  res.cookie('activityFeedToken', projectToken);
  res.json(200)
})

projectRouter.post("/dashboard", async (req, res) => {
  const project = req.body;
  let userId = project.authTokens.id.toString();
  let userName = project.authTokens.name;
  let projectId = project.projectId;
  if (typeof projectId === 'string') projectId = JSON.parse(projectId);
  Project.query()
  .findById(project.projectId)
  .withGraphJoined("bugs.[users.[company_position], comments.[poster],bug_priority,poster, bug_status]")
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.json(err);
  });
  
  await client.user(userId).delete();
  await client.user(userId).getOrCreate({
    name: userName
  })
})

projectRouter.post("/post", (req, res) => {
  Project.query()
  .insert(req.body)
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
})
module.exports = projectRouter;