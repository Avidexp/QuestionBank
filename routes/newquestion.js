var express = require('express');
var questionsRouter = express.Router();
var newQuestion = require('../models/newQuestion.model');
var newQuestionController = require('../controllers/newQuestion.controller');


questionsRouter.route('/new').get(newQuestionController.getQuestion);
questionsRouter.route('/new').post(newQuestionController.addNewQuestion);

questionsRouter.route('/').get(newQuestionController.getFromController);

questionsRouter.route('/new/:question').get(newQuestionController.getUpdateQuestion);
questionsRouter.route('/new/:question').post(newQuestionController.changeQuestion);
module.exports = questionsRouter;