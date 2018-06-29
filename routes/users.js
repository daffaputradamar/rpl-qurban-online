const express = require('express')
const router = express.Router()
const passport = require('passport')

const usersController = require('../controllers/users')
const proofsController = require('../controllers/proofs')

router.get('/', passport.authenticate('jwt-user', {session: false}), usersController.index)
router.post('/authenticate', usersController.authenticate)
router.post('/',usersController.create)
router.get('/:userId',usersController.show)
router.put('/:userId', usersController.update)
router.delete('/:userId', usersController.destroy)

router.get('/:userId/proofs/', passport.authenticate('jwt-user', {session: false}), proofsController.index)
router.post('/:userId/proofs/', passport.authenticate('jwt-mosque', {session: false}), proofsController.create)
router.get('/:userId/proofs/:proofId',proofsController.show)
router.put('/:userId/proofs/:proofId', proofsController.update)
router.delete('/:userId/proofs/:proofId', proofsController.destroy)

module.exports = router