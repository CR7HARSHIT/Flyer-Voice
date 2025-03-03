const express = require('express')

const router = express.Router()

const {saveAdmin,getAdmin} = require('../controller/adminController')

router.post('/signup',saveAdmin)
router.post('/signin',getAdmin)

module.exports = router