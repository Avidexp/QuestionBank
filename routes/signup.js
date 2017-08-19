var express = require('express');
var router = express.Router();

var express = require('express');
var signupModel = require('../models/user.model');
var signupController = require('../controllers/signup.controller');

router.route('/').get(signupController.getUserTemplate);
router.route('/').post(signupController.addNewUser);


module.exports = router;