const express = require('express')
const router = express.Router()

const mosquesController = require('../controllers/mosques')
const animalsController = require('../controllers/animals')

router.get('/', mosquesController.index)
router.post('/',mosquesController.create)
router.get('/:mosqueId',mosquesController.show)
router.put('/:mosqueId', mosquesController.update)
router.delete('/:mosqueId', mosquesController.destroy)

router.get('/:mosqueId/animals/', animalsController.index)
router.post('/:mosqueId/animals/',animalsController.create)
router.get('/:mosqueId/animals/:animalId',animalsController.show)
router.put('/:mosqueId/animals/:animalId', animalsController.update)
router.delete('/:mosqueId/animals/:animalId', animalsController.destroy)

module.exports = router