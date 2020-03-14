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

userRouter.route('/find')
  .get((req, res, next) => {
    passport.authenticate('jwt', { session: false }, (info, err) => {
      if (err) {
        res.send(err.message);
      }
      if (info != undefined) {
        res.send(info.message);
      } else {
        console.log('user found in db from route');
        res.status(200).send({
          auth: true,
          message: 'we made it'
        })
      }
    })(req, res, next);
  }
)

userRouter.post('/signup', (req, res, next) => {
  passport.authenticate('register', { 
    successRedirect: "/login",
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
      })
    }
  })(req, res, next);
});

userRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      res.status(422).send(info.message);
    } else {
      req.logIn(user, err => {
        User.query()
        .findOne({ email: user.email })
        .then(user => {
          const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET_KEY);
          res.status(200).send({
            auth: true,
            token: token,
            message: 'user found & logged in'
          })
        })
      }) 
    }
  })(req, res, next)
})

module.exports = userRouter;