const router = require('express').Router();
const homeService = require('../services/HomeService');

router
.post('/getProfile', homeService.getProfile)
.post('/setProfile', homeService.setProfile)
.post('/updateProfile', homeService.updateProfile)

module.exports = router;