var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newUserSchema = new Schema({
    username: String,
    passwordHash: String,
    email: String,
    createdAt: Date
});

var newUser = mongoose.model('newUser', newUserSchema);
module.exports = newUser;