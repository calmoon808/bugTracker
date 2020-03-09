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
      console.log("hello")
      try {
        User.query().findOne({ email : email })
        .then(async user => {
          // if (user !== undefined) {
          //   console.log('email already taken');
          //   return done(null, false, { message: 'email already taken' });
          // } else {
            console.log("WHY DONT You RUN");
            bcrypt.genSalt(saltRounds, (err, salt) => {
              if (err) {
                console.log(err)
              }
              console.log(salt)
              return salt
            })
            console.log("fuck bcrypt");
            // await bcrypt.hash(password, saltRounds, (err, hash) => {
            //   console.log("FUUUUUUUUUUUCCCCCCCCCCCCCCCKKKKKKKKk")
            //   if (err){
            //     return err
            //   }
            //   console.log(hash)
            //   User.query()
            //   .insert({
            //     email: email,
            //     password: hash
            //   })
            //   console.log('user created');
            //   return done(null, user);
            // })
          // }
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
        console.log("FUUUUCKKKK");
        User.query()
        .findOne({ 'email': email })
        .then(user => {
          console.log(user);
          if (user[0] === undefined) {
            return done(null, false, { message: 'bad email' });
          } else {
            console.log("1111111111111", typeof(password));
            console.log("2222222222222", typeof(user[0].password));
            console.log(password === user[0].password);
            bcrypt.compare(password, user[0].password).then(response => {
              console.log(response)
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match '});
              }
              console.log('user found & authenticated');
              return done(null, user);
            })
            console.log('finished?')
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