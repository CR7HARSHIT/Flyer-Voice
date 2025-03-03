const express = require('express')

const router = express.Router()

const {saveHelpDeskFeedback,getHelpDeskFeedbacks} = require('../controller/helpDeskController')
const authentication = require('../middleware/authentication')

router.post('/',saveHelpDeskFeedback)

router.use(authentication)
router.get('/',getHelpDeskFeedbacks)

module.exports = router