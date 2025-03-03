const express = require('express')

const router = express.Router()

const {saveFoodCourtFeedback,getFoodCourtFeedbacks} = require('../controller/foodCourtController')
const authentication = require('../middleware/authentication')

router.post('/',saveFoodCourtFeedback)

router.use(authentication)
router.get('/',getFoodCourtFeedbacks)

module.exports = router