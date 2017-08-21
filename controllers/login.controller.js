var users = require('../models/user.model');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'abcdefg';

var jwt = require('jsonwebtoken');

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
exports.getLoginTemplate = function(req, res, next) {
    res.render('login', {
        title: 'Log in :)'
    });
};

exports.checkLogin = function(req, res, next) {
    users.aggregate([
            { $match: { username: req.body.username, passwordHash: encrypt(req.body.password) } }
        ],
        function(err, payload) {
            if (err) {
                next(err);
            }
            if (payload == 0) {
                res.render('login', { error: "invalid username or password" });
            } else {
                req.session.user = payload;
                // Stores user info in session cookie
                res.json({ token: jwt.sign({ email: payload.email, username: payload.username, _id: payload._id }, 'QuestionBank') });
                res.render('viewUser', {
                    title: "Successful Login Attempt",
                    users: payload
                });
            }
        }
    )

};