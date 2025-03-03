const express = require('express')

const router = express.Router()

const {saveUser,getUsers} = require('../controller/userController')

router.post('/',saveUser)
router.get('/',getUsers)

module.exports = router