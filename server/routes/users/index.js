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

userRouter.post("/login", passport.authenticate('login'), (req, res) => {
  return res.send('hello');
})

// userRouter.post("/signup", passport.authenticate('register', {
//   successRedirect: "/",
//   failureRedirect: "/users/login"
// }), (req, res) => {
//   console.log('HELLLLOOOO');
//   res.send("idk")
// })

userRouter.post('/signup', (req, res, next) => {
  passport.authenticate('register', { 
    successRedirect: "/login",
    failureFlash: "bluh"
  },(err, user, info) => {
    if (err) {
      console.log(err)
    }
    if (info !== undefined) {
      res.status(422).send(info.message);
    } else {
      req.login(user, err => {
        const data = {
          email: req.body.email,
          first_name: req.body.firstName,
          last_name: req.body.lastName
        };
        User.query()
        .findOne({ email: data.email })
        .patch({ 
          first_name: data.first_name, 
          last_name: data.last_name 
        }).then(() => {
          console.log('user created in db');
          res.status(200).send({ message: 'user created' })
        })
      });
    }
  })(req, res, next);
});

module.exports = userRouter;