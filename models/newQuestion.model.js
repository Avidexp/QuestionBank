var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newQuestionSchema = new Schema({
    question: String,
    answer: String,
    author: String,
    createdAt: Date,
    updatedAt: Date
});

var newQuestion = mongoose.model('newQuestion', newQuestionSchema);
module.exports = newQuestion;