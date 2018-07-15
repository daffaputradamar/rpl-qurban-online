const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

//Register form
router.get("/register", UsersController.register);

router.post("/register", UsersController.store);

//Login form
router.get("/login", notAuthenticated, UsersController.login);

//Login process
router.post("/login", notAuthenticated, UsersController.authenticate);

//Logout
router.get("/logout", ensureAuthenticated, UsersController.logout);

//Get all Donation
router.get("/:id/donations", ensureAuthenticated, UsersController.donations);

//Get a Proof
router.get(
  "/:id/donations/:donationId",
  ensureAuthenticated,
  UsersController.donation
);

//Add proof
router.post("/proofs", ensureAuthenticated, UsersController.proof);

//Get a user
router.get("/:id", ensureAuthenticated, UsersController.show);

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
