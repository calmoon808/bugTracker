const express = require("express");
const userRouter = express.Router();
const User = require("../../database/models/User")
const passport = require("passport");
const jwt = require("jsonwebtoken");




// const saltRounds = 12;

// const passport = require('passport'),
//   localStrategy = require('passport-local').Strategy
  // JWTStrategy = require("passport-jwt").Strategy,
  // ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.use(
//   'register',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       passReqToCallback: true
//     },
//     (email, password, done) => {
//       console.log("hello")
//       try {
//         console.log('?')
//         User.query()
//         .findOne({ 'email': email })
//         .then(user => {
//           console.log(user);
//           if (user !== null) {
//             console.log('email already taken');
//             return done(null, false, { message: 'email already taken' });
//           } else {
//             bcrypt.hash(password, saltRounds).then(hashedPassword => {
//               User.query()
//               .insert({
//                 email: email,
//                 password: hashedPassword
//               })
//               console.log('user created');
//               return done(null, user);
//             })
//           }
//         })
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// )




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
  res.send("idk")
  console.log('HELLLLOOOO');
})
module.exports = userRouter;