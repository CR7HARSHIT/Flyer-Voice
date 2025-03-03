const express = require('express')

const router = express.Router()

const {saveBaggageFeedback,getBaggageFeedbacks} = require('../controller/baggageController')
const authentication = require('../middleware/authentication')

router.post('/' , saveBaggageFeedback)

router.use(authentication)
router.get('/' , getBaggageFeedbacks)

module.exports = router