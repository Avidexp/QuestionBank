var questions = require('../models/newQuestion.model');

exports.getFromController = function(req, res, next) {
    questions.aggregate([
            { $sort: { updatedAt: -1 } }
        ],
        function(err, payload) {
            if (err) {
                next(err);
            } else {
                res.render('viewQuestion', {
                    title: "Questions App",
                    questions: payload

                });
            }
        }
    )
};