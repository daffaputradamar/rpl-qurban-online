const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../../controllers/api/users");
const proofsController = require("../../controllers/api/proofs");

//auth token middleware
// passport.authenticate("jwt-mosque", { session: false })
// passport.authenticate("jwt-user", { session: false })

router.get("/", usersController.index);
router.post("/authenticate", usersController.authenticate);
router.post("/", usersController.create);
router.get("/:userId", usersController.show);
router.put("/:userId", usersController.update);
router.delete("/:userId", usersController.destroy);

router.get("/:userId/proofs/", proofsController.index);
router.post("/:userId/proofs/", proofsController.create);
router.get("/:userId/proofs/:proofId", proofsController.show);
router.put("/:userId/proofs/:proofId", proofsController.update);
router.delete("/:userId/proofs/:proofId", proofsController.destroy);

module.exports = router;
