const express = require("express");
const userRouter = express.Router();
const User = require("../../database/models/User")

userRouter.route("/")
  .get((req, res) => {
    User.query()
      .then(users => {
        res.json(users);
      })
  })

module.exports = userRouter;