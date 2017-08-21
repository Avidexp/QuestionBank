var user = require('../models/user.model');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'abcdefg';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
};

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};

exports.getUserTemplate = function(req, res, next) {
    res.render('newUser', {
        title: 'Create a User'
    });
};
exports.addNewUser = function(req, res, next) {
    var currentDate = new Date();

    var userToAdd = new user({
        username: req.body.username,
        passwordHash: encrypt(req.body.password),
        email: req.body.email,
        createdAt: currentDate
    });
    user.findOne({ username: req.body.username }, function(err, username) {
        if (err) {
            next(err);
        }
        if (username) {
            res.render('newUser', { error: "USERNAME ALREADY EXISTS" });
        } else {
            user.findOne({ email: req.body.email }, function(err, email) {
                if (err) {
                    next(err);
                }
                if (email) {
                    res.render('newUser', { error: "EMAIL ALREADY EXISTS" });
                } else {
                    userToAdd.save(function(err, payload) {
                        if (err) {
                            next(err);
                        } {
                            return res.render('index', { title: "Question Bank", message: "User Created Successfully" });
                        }
                    }); // end of save
                }
            })
        }
    })
};
/*
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'abcdefg';

function encrypt(text){
var cipher = crypto.createCipher(algorithm,password)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
};

function decrypt(text){
var decipher = crypto.createDecipher(algorithm,password)
var dec = decipher.update(text,'hex','utf8')
dec += decipher.final('utf8');
return dec;
};


user.findOne({$or: [{ email: req.body.username},{ email: req.body.email}]}, function (err, user) {
        if (err) {
            next(err);
        }
        if (user) {
            res.send("USERNAME OR EMAIL ALREADY EXISTS CLICK BACK AND TRY AGAIN");
        } else {
            userToAdd.save(function(err, payload) {
                if (err) {
                    next(err);
                } {
                    return res.send("You have successfully created a User");
                }
        });
}})
*/