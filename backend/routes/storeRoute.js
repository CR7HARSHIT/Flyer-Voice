const express = require('express')

const router = express.Router()

const {saveStoreFeedback,getStoreFeedbacks} = require('../controller/storeController')
const authentication = require('../middleware/authentication')

router.post('/',saveStoreFeedback)

router.use(authentication)
router.get('/',getStoreFeedbacks)

module.exports = router