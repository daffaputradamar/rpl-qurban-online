const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/", ensureAuthenticated, adminController.index);

router.get("/login", notAuthenticated, adminController.login);

router.post("/login", notAuthenticated, adminController.authenticate);

router.get("/logout", ensureAuthenticated, adminController.logout);

//Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please Log In");
    res.redirect("/users/login");
  }
}

function notAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/mosques");
  }
}

module.exports = router;
