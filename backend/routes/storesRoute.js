const express = require('express')

const router = express.Router()

const {getStores} = require('../controller/storesController')

router.get('/',getStores)

module.exports = router