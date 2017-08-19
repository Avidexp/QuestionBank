var pathfinderUI = require('pathfinder-ui');

var express = require('express');
var router = express.Router();


var questionsModel = require('..//models/newQuestion.model.js');
var questionsController = require('../controllers/index.controller');

router.route('/').get(questionsController.getFromController);

module.exports = router;