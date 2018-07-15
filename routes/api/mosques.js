const express = require("express");
const router = express.Router();
const passport = require("passport");

const mosquesController = require("../../controllers/api/mosques");
const animalsController = require("../../controllers/api/animals");

//auth token middleware
// passport.authenticate("jwt-mosque", { session: false })
// passport.authenticate("jwt-user", { session: false })

router.get("/", mosquesController.index);
router.post("/authenticate", mosquesController.authenticate);
router.post("/", mosquesController.create);
router.get("/:mosqueId", mosquesController.show);
router.put("/:mosqueId", mosquesController.update);
router.delete("/:mosqueId", mosquesController.destroy);

router.get("/:mosqueId/animals/", animalsController.index);
router.post("/:mosqueId/animals/", animalsController.create);
router.get("/:mosqueId/animals/:animalId", animalsController.show);
router.put("/:mosqueId/animals/:animalId", animalsController.update);
router.delete("/:mosqueId/animals/:animalId", animalsController.destroy);

module.exports = router;
