const express = require('express')

const router = express.Router()

const {saveCheckInFeedback,getCheckInFeedbacks} = require('../controller/checkInController')
const authentication = require('../middleware/authentication')

router.post('/' , saveCheckInFeedback)

router.use(authentication)
router.get('/' , getCheckInFeedbacks)

module.exports = router