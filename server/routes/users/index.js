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
    //   .limit(1)
    //   .select("*")
    //   .where('email', "ablandamore0@google.cn")
    //   .then(user => {
    //     res.json(user);
    //   })
  })

// userRouter.route("/login")
  // .post(passport.authenticate("login"), (req, res) => {
  //   console.log(req.body);
  //   User.query()
  //     .select("*")
  //     .where("email", req.body.userName)
  //     .then(user => {
  //       if (!user[0]) {
          
  //       }
  //     })
  // })

userRouter.post("/login", passport.authenticate('login'), (req, res) => {
  return res.send('hello');
})

userRouter.route("/register")
  .post((req, res) => {
    
  })
module.exports = userRouter;