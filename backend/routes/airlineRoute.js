const express = require('express')

const router = express.Router()

const {saveAirlineFeedback,getAirlineFeedback} = require('../controller/airlineController')
const authentication = require('../middleware/authentication')

// @route - /api/airline/
router.post('/',saveAirlineFeedback)
router.use(authentication)
router.get('/',getAirlineFeedback)

module.exports = router