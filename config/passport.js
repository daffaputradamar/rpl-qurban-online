const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models").User;
const Mosque = require("../models").Mosque;
const config = require("./database");

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(
    "jwt-user",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({
        where: {
          id: jwt_payload.data.id,
          email: jwt_payload.data.email
        }
      })
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => done(err));
    })
  );
  passport.use(
    "jwt-mosque",
    new JwtStrategy(opts, (jwt_payload, done) => {
      Mosque.findOne({
        where: {
          id: jwt_payload.data.id,
          email: jwt_payload.data.email
        }
      })
        .then(mosque => {
          if (mosque) {
            return done(null, mosque);
          } else {
            return done(null, false);
          }
        })
        .catch(err => done(err));
    })
  );

  //Local Strategy
  passport.use(
    "user",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (username, password, done) => {
        User.findOne({
          where: {
            email: username
          }
        })
          .then(user => {
            if (!user) {
              return done(null, false, { message: "No User Found" });
            } else {
              bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Wrong password" });
                }
              });
            }
          })
          .catch(err => done(err, false));
      }
    )
  );

  //Local Strategy
  passport.use(
    "mosque",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (username, password, done) => {
        Mosque.findOne({
          where: {
            email: username
          }
        })
          .then(mosque => {
            if (!mosque) {
              return done(null, false, { message: "No User Found" });
            } else {
              bcrypt.compare(password, mosque.password).then(isMatch => {
                if (isMatch) {
                  return done(null, mosque);
                } else {
                  return done(null, false, { message: "Wrong password" });
                }
              });
            }
          })
          .catch(err => done(err, false));
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    User.find({
      where: {
        email
      }
    }).then(user => {
      if (!user) {
        Mosque.find({
          where: {
            email
          }
        }).then(mosque => done(null, mosque));
      } else {
        return done(null, user);
      }
    });
  });
};
