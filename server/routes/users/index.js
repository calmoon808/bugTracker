const express = require("express");
const userRouter = express.Router();
const User = require("../../database/models/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");

userRouter.route("/")
  .get((req, res) => {
    User.query().then(users => {
      console.log("help")
      res.json(users);
    })
  })
  // .post((req, res) => {
  //   console.log(req.body);
  //   User.query().insert({
  //     email: req.body.email,
  //     password: req.body.password
  //   }).then(res => {
  //     return res.send('lol')
  //   })
  // })

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

userRouter.post("/signup", passport.authenticate('register'), (req, res) => {
  console.log('HELLLLOOOO');
  res.send("idk")
})
module.exports = userRouter;