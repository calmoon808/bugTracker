const express = require("express");
const commentRouter = express.Router();
const Comment = require("../../database/models/Comment");

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
  Comment.query()
  .insert(req.body)
  .then(() => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
})

module.exports = commentRouter;