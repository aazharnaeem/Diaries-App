const { Router } = require('express')
const router = Router()

const user = require('../controllers').user

router.post('/login', user.Login)
router.post('/signup', user.Signup)

module.exports = router