const express = require('express')

const router = express.Router()

const {getAirlines} = require('../controller/airlinesController')

router.get('/',getAirlines)

module.exports = router