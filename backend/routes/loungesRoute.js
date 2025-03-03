const express = require('express')

const router = express.Router()

const {getLounges} = require('../controller/loungesController')

router.get('/',getLounges)

module.exports = router