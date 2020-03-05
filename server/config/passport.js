import bcrypt from "bcrypt";
import User from "../database/models/User";

const saltRounds = 12;

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        //CHANGE TO QUERY DB FOR USERNAME
        User.query().then(users => {
          console.log(users);
        }).then(user => {
          if (user !== null) {
            console.log('username already taken');
            return done(null, false, { message: 'username already taken' });
          } else {
            bcrypt.hash(password, saltRounds).then(hashedPassword => {
              //ADD FUNCTION TO ADD TO DATABASE
              console.log('user created');
              return 'add function'
            })
          }
        })
      } catch (err) {
        done(err);
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    (username, password, done) => {
      try {
        //CHANGE TO QUERY DB FOR USERNAME
        User.query().then(users => {
          console.log(users);
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response === true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match '});
              }
              console.log('user found & authenticated');
              return done(null, user);
            })
          }
        })
      } catch (err) {
        done(err);
      }
    }
  )
)

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET_KEY
};

passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    try {
      //INSERT FUNCTION TO CHECK USER DB WITH JWT ID
      User.query().then(users => {
        console.log(users);
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      })
    } catch (err) {
      done(err);
    }
  })
)