const express = require('express')
const router = express.Router()
const {postRequest,postData} = require('../controllers/controller')

router.post('/checkout', postRequest)
router.post('/contact',postData)
module.exports = router