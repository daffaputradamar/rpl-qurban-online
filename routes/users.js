const express = require('express')
const router = express.Router()
const passport = require('passport')

const usersController = require('../controllers/users')

router.get('/', passport.authenticate('jwt-user', {session: false}), usersController.index)
router.post('/authenticate', usersController.authenticate)
router.post('/',usersController.create)
router.get('/:userId',usersController.show)
router.put('/:userId', usersController.update)
router.delete('/:userId', usersController.destroy)

module.exports = router