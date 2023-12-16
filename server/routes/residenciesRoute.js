const express = require('express')
const {createResidency, getAllResedencies, getResidency} = require('../controllers/residenciesController')
const router = express.Router()

router.route('/create').post(createResidency)
router.route('/getAll').get(getAllResedencies)
router.route('/:id').get(getResidency)
module.exports = router