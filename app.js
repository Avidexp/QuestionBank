var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');
var jwt = require('jsonwebtoken');

var router = express.Router();
//PathFinder



app.use(session({
    cookieName: 'session',
    secret: 'abcdefg',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));


//Routes
var newQuestion = require('./routes/newquestion');
var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');


mongoose.connect('mongodb://admin:admin@ds127993.mlab.com:27993/questionbank');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('WERE CONNECTED BITCHESSS!');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/newQuestion', newQuestion);
app.use('/signup', signup);
app.use('/login', login);
app.use('/dashboard', dashboard);


var pathfinderUI = require('pathfinder-ui');
//pathfinder
app.use('/pathfinder', function(req, res, next) {
    pathfinderUI(app);
    next();
}, pathfinderUI.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;