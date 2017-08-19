var User = require('../models/user.model');

exports.loginCheck = function(req,res,next){
    if (req.session && req.session.user) { // Check if session exists  
    // lookup the user in the DB by pulling their email from the session
      User.findOne({ email: req.session.user.email }, function (err, user) {
        if (!user) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.redirect('/login');
        } else {
          // expose the user to the template
          res.locals.user = user;
   
          // render the dashboard page
          res.render('dashboard', {
              user: res.local.user.username,
              email: res.locasl.user.email
          });
        }
      });
    } else {
      res.render('login', {error : "Please Log in First"});
    }
  };
