const express = require("express");
const userRouter = express.Router();
const User = require("../../database/models/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");

userRouter.route("/")
  .get((req, res) => {
    User.query()
      .then(users => {
        res.json(users);
      })
    // User.query()
    //   .select("*")
    //   .where('email', "ablandamore0@google.cn")
    //   .then(user => {
    //     res.json(user);
    //   })
  })

module.exports = userRouter;