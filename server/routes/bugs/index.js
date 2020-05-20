const express = require("express");
const bugRouter = express.Router();
const Bug = require("../../database/models/Bug");
const UsersBugs = require("../../database/models/UsersBugs");
const client = require("../../../src/getStream");

function compare( a, b ) {
  if ( a.first_name.toLowerCase() < b.first_name.toLowerCase() ){
    return -1;
  }
  if ( a.first_name.toLowerCase() > b.first_name.toLowerCase() ){
    return 1;
  }
  return 0;
}

bugRouter.route("/")
  .get((req, res) => {
    Bug.query()
    .withGraphFetched('poster')
    .withGraphFetched('project')
    .withGraphFetched('bug_status')
    .withGraphFetched('bug_priority')
    .withGraphFetched('users')
    .then(bugs => {
      res.json(bugs);
    })
    .catch(err => {
      return res.send(err);
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
  .catch(err => {
    res.send(err);
  })
})

bugRouter.post("/description", (req, res) => {
  const descriptionData = req.body;
  const feed = client.feed('projectFeed', descriptionData.project_id.toString());
  Bug.query()
  .findById(descriptionData.bugId)
  .update({ bug_description: descriptionData.newDescription })
  .then(() => {
    feed.addActivity({
      'actor': client.user(bugData.poster_id).ref(),
      'verb': 'add',
      'object': `has updated bug #${descriptionData.bugId}'s description`,
    })
    res.sendStatus(200)
  })
  .catch(err => {
    res.send(err);
  })
})

bugRouter.post("/find", (req, res) => {
  const bugId = req.body.bugId;
  Bug.query()
  .findById(bugId)
  .withGraphFetched('users')
  .then(response => {
    let userArr = response.users
    response.users = userArr.sort(compare)
    res.json(response);
  })
})

bugRouter.post("/post", (req, res) => {
  const bugData = req.body;
  const feed = client.feed('projectFeed', bugData.project_id.toString());
  Bug.query()
  .insert(bugData)
  .then(response => {
    feed.addActivity({
      'actor': client.user(bugData.poster_id).ref(),
      'verb': 'add',
      'object': `has added a bug`,
    })
    res.sendStatus(200);
  })
  .catch(err => {
    res.send(err)
  })
})

bugRouter.post("/removeUser", async (req, res) => {
  const bugUser = req.body;
  const feed = client.feed('projectFeed', bugUser[1].id.toString());
  await bugUser[0].forEach((data) => {
    UsersBugs.query()
    .delete()
    .where("bugs_id", data[0].bugs_id)
    .where("users_id", data[0].users_id)
    .then(() =>{
      feed.addActivity({
        'actor': client.user(bugUser[0].users_id).ref(),
        'verb': 'remove users',
        'object': `has removed users from bug #${bug_id}`,
      })
    })
    .catch(err => {
      return res.send(err);
    })
  })
  res.sendStatus(200);
})

bugRouter.post("/update", async (req, res) => {
  const updateInfo = req.body;
  let updateObj;
  const bug = Bug.query().findById(updateInfo.bug_id)
  await bug.then(response => {
    updateObj = {
      id: response.id,
      bug_status_id: response.bug_status_id,
      bug_priority_id: response.bug_priority_id
    }
  })
  const feed = client.feed('projectFeed', updateInfo.projectId.toString());
  if (updateInfo.newUserArr){
    UsersBugs.query()
    .insertGraph(updateInfo.newUserArr)
    .then(() =>{
      feed.addActivity({
        'actor': client.user(updateInfo.id).ref(),
        'verb': 'update',
        'object': `has added users to bug #${updateObj.id}`,
      })
    })
    .catch(err => (
      res.send(err)
    ))
  }

  if (updateInfo.status !== updateObj.bug_status_id){
  
    updateObj.bug_status_id = updateInfo.status;
    feed.addActivity({
      'actor': client.user(updateInfo.id).ref(),
      'verb': 'update',
      'object': `has changed the status of bug #${updateObj.id}`,
    })
    .catch(err => (
      res.send(err)
    ))
  }
  if (updateInfo.priority !== updateObj.bug_priority_id){
    updateObj.bug_priority_id = updateInfo.priority;
    feed.addActivity({
      'actor': client.user(updateInfo.id).ref(),
      'verb': 'update',
      'object': `has updated the priority of bug #${updateObj.id}`,
    })
    .catch(err => (
      res.send(err)
    ))
  }
  
  bug.update(updateObj)
  .catch(err => {
    console.log(err)
  })
  res.sendStatus(200);
})

module.exports = bugRouter;