const express = require("express");
const commentRouter = express.Router();
const Comment = require("../../database/models/Comment");
const client = require("../../../src/getStream");

commentRouter.post("/bug", (req, res) => {
  Comment.query()
  .where("bug_id", "=", req.body.bugId)
  .orderBy("created_at", 'desc')
  .withGraphFetched("poster")
  .then((response) => {
    res.json(response);
  })
})

commentRouter.post("/add", (req, res) => {
  const feed = client.feed('projectFeed', req.body[1].toString());
  Comment.query()
  .insert(req.body[0])
  .then(() => {
    feed.addActivity({
      'actor': client.user(req.body[0].poster_id).ref(),
      'verb': 'comment',
      'object': `has commented on bug #${req.body[0].bug_id}`,
    })
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})

module.exports = commentRouter;