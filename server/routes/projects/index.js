const express = require("express");
const projectRouter = express.Router();
const Project = require("../../database/models/Project");
const client = require("../../../src/getStream")

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
  let userId = req.body.authTokens.id.toString();
  let userName = req.body.authTokens.name;
  let projectId = req.body.projectId.id;
  if (typeof projectId === 'string') projectId = JSON.parse(projectId);
  Project.query()
  .findById(projectId)
  .withGraphFetched("company")
  .withGraphJoined("bugs.[users.[company, company_position], comments.[poster],bug_priority,poster, bug_status]")
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  });
  
  await client.user(`user_${userId}`).getOrCreate({
    name: userName
  })
  client.user(`user_${userId}`).update({name: userName})
  // .then(() => {
  //   client.user(`user_${userId}`).get()
  //   .then(user => {
  //     console.log(user);
  //   });
  // })

  const feed = client.feed('projectFeed', projectId.toString());

  // feed.addActivity({
  //   'actor': client.user(userId).ref(),
  //   'verb': 'stab',
  //   'object': 'I love this picture',
  // })
})
module.exports = projectRouter;