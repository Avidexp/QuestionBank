var users = require('../models/user.model');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'abcdefg';
var nJwt = require('njwt');
var jwt = require('jsonwebtoken');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var secureRandom = require('secure-random');

var signingKey = secureRandom(256, { type: 'Buffer' });


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

                console.log(payload[0].username);
                var claims = {
                    sub: payload[0].username,
                    iss: 'questionbank',
                }
                var jwt = nJwt.create(claims, 'questionbank');
                jwt.setExpiration(new Date().getTime() + (60 * 60 * 1000));
                // Stores user info in session cookie
                var token = jwt.compact();
                process.env.token = token;

                var base64SigningKey = signingKey.toString('base64');
                res.redirect('/dashboard');
                // return the information including token as JSON

                // res.render('dashboard', {
                //     title: "Successful Login Attempt",
                //     email: req.session.user.email,
                //     username: req.session.user.username,
                //     token: token
                // });
            }
        }
    )

};


exports.verifyToken = function(req, res) {

        var token = process.env.token || req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {

            res.send("YOU HAVE A TOKEN");
        } else {
            res.send("You do not have a token");
        }
        // nJwt.verify(token, signingKey, function(err, verifiedJwt) {
        //     if (err) {
        //         res.send(err); // Token has expired, has been tampered with, etc
        //     } else {
        //         res.send("YOU ARE CONNECTED USING THE TOKEN" + token);
        //     }
        // });
    }
    /*
    var token = jwt.sign({ email: payload.email, username: payload.username, _id: payload._id }, 'QuestionBank');
    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });

    */