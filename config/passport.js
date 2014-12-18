var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , GitHubStrategy = require('passport-github').Strategy;
  
var crypto = require('crypto');

function encryptPassword(password) {
  return crypto.createHash("md5").update(password).digest("base64");
}


var localHander = function(username, password,  done) {
  process.nextTick(function() {
    console.log('localHander localHander for passport');  
    var enpass = encryptPassword(password);
    console.log(enpass);
    User.findOne({ usermail: username, password: enpass }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect usermail or password.' });
      }
      
      return done(null, user);
    });
  });  
}

var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    User.findOne({id: profile.id}, function(err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          id: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function(err, user) {
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

passport.deserializeUser(function(uid, done) {
  User.findOne({id: id}, function(err, user) {
    done(err, user);
  });
});

      

passport.use(new LocalStrategy(localHander));
    
passport.use(new GitHubStrategy({
        clientID: "92685ae9b29935a246a1",
        clientSecret: "b2afcdc430daeaa945bc9655b425888cf68f63a7",
        callbackURL: "http://192.168.1.249:1337/auth/github/callback"
      }, verifyHandler));

module.exports = {
        customMiddleware: function(app) {
            console.log('Express midleware for passport');

            app.use(passport.initialize());
            app.use(passport.session());
        }
    
};