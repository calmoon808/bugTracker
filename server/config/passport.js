const bcrypt = require('bcryptjs');
const User = require("../database/models/User");

const saltRounds = 12;

const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  JWTStrategy = require("passport-jwt").Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (email, password, done) => {
      try {
        User.query().findOne({ email : email })
        .then(async user => {
          if (user !== undefined) {
            return done(null, false, { message: 'Email already taken.' });
          } else {
            await bcrypt.hash(password, saltRounds, (err, hash) => {
              if (err){
                return err
              }
              User.query().insert({
                email: email,
                password: hash
              }).then(response => {
                console.log("account created");
                return done(null, response);
              })
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
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (email, password, done) => {
      try {
        User.query()
        .findOne({ email: email })
        .then(user => {
          if (user === undefined) {
            return done(null, false, { message: 'Username or password invalid.' });
          } else {
            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'Username or password invalid. '});
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
      User.query()
      .findOne({ 'email': jwt_payload.id })
      .then(user => {
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