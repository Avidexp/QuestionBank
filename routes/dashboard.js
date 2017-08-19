var express = require('express');
var router = express.Router();

var dashboardController = require('../controllers/dashboard.controller');

router.route('/').get(dashboardController.loginCheck);

module.exports = router;