const express = require("express");
const userRouter = express.Router();
const User = require("../../database/models/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

const signatureOptions = {
  // secure: true,
  httpOnly: true,
}
const headerPayloadOptions = {
  // secure: true,
  maxAge: 8 * 60 * 60 * 1000
}

userRouter.get("/", (req, res) => {
  User.query().orderBy("first_name")
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
});

userRouter.post("/dashboard", (req, res) => {
  let data = req.body.data;
  if (typeof data === 'string') data = JSON.parse(data);
  User.query()
  .skipUndefined()
  .findById(data.id)
  .withGraphFetched("company_position")
  .withGraphFetched("company")
  .withGraphFetched("projects.[project_creator, project_status]")
  .withGraphJoined("bugs.[bug_status, bug_priority, users, poster, comments.[poster], project.[project_creator, project_status, company, bugs.[poster, bug_status, comments.[poster]]]]")
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    console.log(err);
    res.json(err);
  })
});

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
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie('headerPayload', headerPayloadOptions);
  res.clearCookie('signature', signatureOptions);
  res.clearCookie('activityFeedToken');
  res.clearCookie('connect.sid')
  return res.json({ session: {}, message: "See you again soon!" });
});

userRouter.post("/update", (req, res) => {
  let changeObj = {};
  const userData = req.body;
  const changeType = userData.changeType

  if (changeType === "name"){
    changeObj = { 
      first_name: userData.firstName,
      last_name: userData.lastName
    }
  } else if (changeType === "email"){
    changeObj = { email: userData.email }
  } else if (changeType === "company"){
    changeObj = { company_id: userData.dataId }
  } else if (changeType === "position"){
    changeObj = { company_position_id: userData.dataId };
  }
  User.query()
  .findById(userData.userId)
  .update(changeObj)
  .then(response => {
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  })
});

userRouter.post("/newPassword", (req, res) => {
  const { userId, newPassword } = req.body;
  bcrypt.hash(newPassword, saltRounds)
  .then(newPassword => {
    User.query()
    .findById(userId)
    .update({ password: newPassword })
    .then(response => {
      res.sendStatus(200);
    })
  })
})

userRouter.post("/oldPassword", (req, res) => {
  const { userId, oldPassword } = req.body;
  User.query()
  .findById(userId)
  .then((response) => {
    bcrypt.compare(oldPassword, response.password)
    .then(response => res.send(response));
  })
});

module.exports = userRouter;