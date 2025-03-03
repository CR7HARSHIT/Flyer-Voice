const express = require('express')

const router = express.Router()

const {saveWashroomFeedback,getWashroomFeedbacks} = require('../controller/washroomController')
const authentication = require('../middleware/authentication')

router.post('/',saveWashroomFeedback)

router.use(authentication)
router.get('/',getWashroomFeedbacks)

module.exports = router