const express = require('express')

const router = express.Router()

const {saveLoungeFeedback,getLoungeFeedbacks} = require('../controller/loungeController')
const authentication = require('../middleware/authentication')

router.post('/',saveLoungeFeedback)

router.use(authentication)
router.get('/',getLoungeFeedbacks)

module.exports = router