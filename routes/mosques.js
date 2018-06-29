const express = require('express')
const router = express.Router()
const passport = require('passport')

const mosquesController = require('../controllers/mosques')
const animalsController = require('../controllers/animals')

router.get('/', passport.authenticate('jwt-mosque', {session: false}), mosquesController.index)
router.post('/authenticate', mosquesController.authenticate)
router.post('/',mosquesController.create)
router.get('/:mosqueId',mosquesController.show)
router.put('/:mosqueId', mosquesController.update)
router.delete('/:mosqueId', mosquesController.destroy)

router.get('/:mosqueId/animals/', passport.authenticate('jwt-mosque', {session: false}), animalsController.index)
router.post('/:mosqueId/animals/', passport.authenticate('jwt-user', {session: false}), animalsController.create)
router.get('/:mosqueId/animals/:animalId',animalsController.show)
router.put('/:mosqueId/animals/:animalId', animalsController.update)
router.delete('/:mosqueId/animals/:animalId', animalsController.destroy)

module.exports = router