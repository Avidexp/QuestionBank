var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboard.controller');
var logincontroller = require('../controllers/login.controller');

router.route('/').get(dashboardController.verifyToken);

module.exports = router;