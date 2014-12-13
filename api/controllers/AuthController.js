/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
var jwt = require('jsonwebtoken');
var secret = 'ewfn09qu43f09qfj94qf*&H#(R';


module.exports = {

  index: function(req, res) {
    res.view(user);
  },

  logout: function(req, res) {
        req.logout();
        res.send({
            success: true,
            message: 'logoutSuccessful'
        });
  },

  sign: function(req, res) {
    passport.authenticate('local',  function(err, user) {
      if ((err) || (!user)) {
                res.send({
                    success: false,
                    message: 'invalidPassword'
                });
                return;
            }else{
                if (err) {
                    res.send({
                        success: false,
                        message: 'unknownError',
                        error: err
                    });
                } else {
                    
                    var token = jwt.sign(user, secret, { expiresInMinutes: 60*24 });
                    res.send({
                        success: true,
                        user: user,
                        token: token
                    });
                }
            }
    })(req, res);
  },
  
  // http://developer.github.com/v3/
  // http://developer.github.com/v3/oauth/#scopes
  github: function(req, res) {
    passport.authenticate('github', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        
        return;
      });
    })(req, res);
  },

  // https://developers.facebook.com/docs/
  // https://developers.facebook.com/docs/reference/login/
  facebook: function(req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  // https://developers.google.com/
  // https://developers.google.com/accounts/docs/OAuth2Login#scope-param
  google: function(req, res) {
    passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  // https://apps.twitter.com/
  // https://apps.twitter.com/app/new
  twitter: function(req, res) {
    passport.authenticate('twitter', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

   // http://developer.github.com/v3/
  // http://developer.github.com/v3/oauth/#scopes
  taobao: function(req, res) {
    passport.authenticate('taobao', { failureRedirect: '/login' }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  }
};
