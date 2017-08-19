var newQuestion = require('../models/newQuestion.model');
var router = require('express').Router();

exports.getQuestion = function(req, res, next) {
    res.render('newQuestion', {
        title: 'Questions'
    });
};
exports.addNewQuestion = function(req, res, next) {
    var currentDate = new Date();
    var QuestionToAdd = new newQuestion({
        author: req.body.author,
        answer: req.body.answer,
        question: req.body.question,
        createdAt: currentDate,
        updatedAt: Date()
    });
    QuestionToAdd.save(function(err, payload) {
        if (err) {
            next(err);
        } else {
            return res.redirect('/');
        }
    });
};

exports.getFromController = function(req, res, next) {
    newQuestion.aggregate([{
                $sort: {
                    updatedAt: -1
                }
            },
            {
                $limit: 25
            }
        ],
        function(err, payload) {
            if (err) {
                next(err);
            } else {
                res.render('viewQuestion', {
                    questions: payload,
                    title: "Questions"
                });
            }
        })
};

//gets the current question to update
exports.getUpdateQuestion = function(req, res, next) {
    newQuestion.aggregate([{
            $match: {
                question: req.params.question,
                author: req.params.author,
                answer: req.params.answer
            }
        }],
        function(err, payload) {
            if (err) {
                next(err);
            } else {
                res.render('updateQuestion', {
                    title: "Questions",
                    question: req.params.question, //autofulls question in updateQuestion
                    author: req.params.author,
                    answer: req.params.answer
                });
            }
        });
};

//Updates the current question
exports.changeQuestion = function(req, res, next) {
    newQuestion.updateOne({
            question: req.body.question
        }, {
            $set: {
                question: req.body.question,
                answer: req.body.answer,
                updatedAt: Date()
            }
        },

        function(err, payload) {
            if (err) {
                return err
            } else {
                res.redirect('/');
            }
        })
};



/*
exports.getUpdateQuestion = function(req, res, next) {
    
    res.render('updateQuestion', {
        title: 'Update a Question',
        question: req.params.question,
        author: req.params.author
    });
};
*/

/*
// res.render('updateQuestion', {
//     title: 'Update a Question',
//     question: req.params.question,
//     author: req.params.author
// });

res.render('viewQuestion', {
                        title: "Questions",
                        question: payload.question,
                        author: payload.author,
                        answer: payload.aanswer
                    });
*/