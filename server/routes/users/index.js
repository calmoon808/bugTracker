const express = require("express");
const userRouter = express.Router();
const User = require("../../database/models/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");

const signatureOptions = {
  // secure: true,
  httpOnly: true,
}
const headerPayloadOptions = {
  // secure: true,
  maxAge: 8 * 60 * 60 * 1000
}

userRouter.route("/")
  .get((req, res) => {
    User.query()
    .withGraphFetched("project_position")
    .withGraphFetched("company")
    .withGraphFetched("projects")
    .withGraphJoined("bugs")
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
  })

userRouter.post("/dashboard", (req, res) => {
  User.query()
  .skipUndefined()
  .findById(req.body.data.id)
  .withGraphFetched("project_position")
  .withGraphFetched("company")
  .withGraphFetched("projects")
  .withGraphJoined("bugs.[poster, project, bug_status, bug_priority]")
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
})

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
      })
    }
  })(req, res, next);
});

userRouter.post('/signup', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
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
          const tokenArr = token.split(".");
          const signature = tokenArr.splice(-1 ,1)[0];
          const headerPayload = tokenArr.join('.');

          res.cookie('headerPayload', headerPayload, headerPayloadOptions);
          res.cookie('signature', signature, signatureOptions);
          res.status(200).send({
            id: user.id,
            session: req.session,
            JWTCookies: req.cookies,
            isAuthenticated: req.isAuthenticated(),
            auth: true,
            token: token,
            message: 'user found & logged in',
          })
        })
      }) 
    }
  })(req, res, next)
})

userRouter.get("/logout", (req, res) => {
  res.clearCookie('headerPayload', headerPayloadOptions);
  res.clearCookie('signature', signatureOptions);
  res.clearCookie('connect.sid')
  return res.json({ session: {}, message: "See you again soon!" });
});

module.exports = userRouter;