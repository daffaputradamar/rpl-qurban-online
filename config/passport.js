const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models").User;
const Mosque = require("../models").Mosque;
const Admin = require("../models").Admin;
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

  passport.use(
    "admin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      (username, password, done) => {
        Admin.findOne({
          where: {
            username
          }
        })
          .then(admin => {
            if (!admin) {
              return done(null, false, { message: "Unauthorized User" });
            } else {
              return done(null, admin);
            }
          })
          .catch(err => done(err, false));
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // console.log(user);
    User.find({
      where: {
        email: user.email
      }
    }).then(pengguna => {
      if (!pengguna) {
        Mosque.find({
          where: {
            email: user.email
          }
        }).then(mosque => {
          if (!mosque) {
            Admin.find({
              username: user.username
            }).then(admin => done(null, admin));
          } else {
            return done(null, mosque);
          }
        });
      } else {
        return done(null, pengguna);
      }
    });
  });
};
