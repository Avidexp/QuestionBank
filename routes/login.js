var express = require('express');
var router = express.Router();

var userModel = require('../models/user.model');
var loginController = require('../controllers/login.controller');

router.route('/').get(loginController.getLoginTemplate);
router.route('/').post(loginController.checkLogin);


module.exports = router;