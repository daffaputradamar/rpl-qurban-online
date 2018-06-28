const express = require('express')
const router = express.Router()

const animalsController = require('../controllers/animals')

router.get('/', animalsController.index)
router.post('/',animalsController.create)
router.get('/:animalId',animalsController.show)
router.put('/:animalId', animalsController.update)
router.delete('/:animalId', animalsController.destroy)

module.exports = router