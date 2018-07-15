const express = require("express");
const router = express.Router();

const MosquesController = require("../controllers/mosques");

//Get all Mosques
router.get("/", MosquesController.index);

//Register form
router.get("/register", MosquesController.register);

router.post("/register", MosquesController.store);

//Login form
router.get("/login", notAuthenticated, MosquesController.login);

//Login process
router.post("/login", notAuthenticated, MosquesController.authenticate);

//Logout
router.get("/logout", ensureAuthenticated, MosquesController.logout);

//Insert a Donation
router.get("/:id/donate", ensureAuthenticated, MosquesController.donate);

//Insert a Donation
router.post("/:id/donate", ensureAuthenticated, MosquesController.storeDonate);

//Get all Donation
router.get("/:id/donations", ensureAuthenticated, MosquesController.donations);

//Get a Mosque
router.get("/:id", MosquesController.show);

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
