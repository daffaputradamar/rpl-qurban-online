const passport = require("passport");

let Mosque = require("../models").Mosque;
let Animal = require("../models/").Animal;
let Proof = require("../models/").Proof;
let User = require("../models/").User;

module.exports = {
  index: (req, res) => {
    User.findAll().then(users => {
      Mosque.findAll().then(mosques => {
        res.render("admin/adminDashboard", {
          users,
          mosques
        });
      });
    });
  },
  login: (req, res) => {
    res.render("admin/adminLogin");
  },
  authenticate: (req, res, next) => {
    passport.authenticate("admin", {
      successRedirect: "/admin/",
      failureRedirect: "/admin/login",
      badRequestMessage: "Login Information Invalid",
      failureFlash: true
    })(req, res, next);
  },
  logout: (req, res) => {
    req.logout();
    // req.flash("success", "You are logged out");
    res.redirect("/");
  }
};
