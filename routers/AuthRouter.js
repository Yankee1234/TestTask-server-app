const router = require('express').Router();
const authService = require('../services/AuthService');

router
.post('/login', authService.getUser)
.post('/register', authService.setUser)
.post('/refreshToken', authService.refreshToken)
.post('/removeToken', authService.removeTokenPair)

module.exports = router;

