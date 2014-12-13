/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , GitHubStrategy = require('passport-github').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , TwitterStrategy = require('passport-twitter').Strategy;


var crypto = require('crypto');

function encryptPassword(password) {
  return crypto.createHash("md5").update(password).digest("base64");
}

var localHander = function(username, password, done) {
  process.nextTick(function() {  
    var enpass = encryptPassword(password);
    User.findOne({ username: username, password: enpass }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      
      return done(null, user);
    });
  });  
}

var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {

    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
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
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function(err, user) {
    done(err, user);
  });
});


module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

   middleware: {

  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/


    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    // myRequestLogger: function (req, res, next) {
    //     console.log("Requested :: ", req.method, req.url);
    //     return next();
    // }


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  ***************************************************************************/

    // bodyParser: require('skipper')

    },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000

  /************ curtom
  **************
  ****************/
  customMiddleware: function(app) {

    passport.use(new LocalStrategy(localHander));
    
    passport.use(new GitHubStrategy({
      clientID: "92685ae9b29935a246a1",
      clientSecret: "b2afcdc430daeaa945bc9655b425888cf68f63a7",
      callbackURL: "http://192.168.1.249:1337/auth/github/callback"
    }, verifyHandler));

    passport.use(new FacebookStrategy({
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://192.168.1.249:1337/auth/facebook/callback"
    }, verifyHandler));

    passport.use(new GoogleStrategy({
      clientID: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: 'http://192.168.1.249:1337/auth/google/callback'
    }, verifyHandler));

    passport.use(new TwitterStrategy({
      consumerKey: 'YOUR_CLIENT_ID',
      consumerSecret: 'YOUR_CLIENT_SECRET',
      callbackURL: 'http://192.168.1.249:1337/auth/twitter/callback'
    }, verifyHandler));

    passport.use(new TwitterStrategy({
      consumerKey: '1023037332',
      consumerSecret: 'sandbox49b09c90c20a915c944460501',
      callbackURL: 'http://192.168.1.249:1337/auth/taobao/callback'
    }, verifyHandler));

    app.use(passport.initialize());
    //app.use(passport.session());
  }

};
