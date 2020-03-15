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

userRouter.get("/find", (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(user);
    if (err) {
      console.log(err)
      res.send(err.message);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      console.log('user found in db from route');
      res.status(200).send({
        auth: true,
        email: user.email,
        message: 'we made it'
      })
    }
  })(req, res, next);
});

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
  console.log(req.cookies);
  console.log(req.signedCookies);
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
          const tokenArr = token.split(".");
          const signature = tokenArr.splice(-1 ,1);
          const headerPayload = tokenArr.join('.');
          const signatureOptions = {
            secure: true,
            httpOnly: true,
          }

          const headerPayloadOptions = {
            secure: true,
            maxAge: 60 * 30
          }

          res.cookie('signature', signature, signatureOptions);
          res.cookie('headerPayload', headerPayload, headerPayloadOptions);
          res.status(200).send({
            cookies: req.cookies,
            auth: true,
            token: token,
            message: 'user found & logged in',
          })
        })
      }) 
    }
  })(req, res, next)
})

module.exports = userRouter;