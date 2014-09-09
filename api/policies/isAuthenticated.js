/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function isAuthenticated(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
	console.log('----------isAuthenticated-------true');
    return next();
  };
	console.log('----------isAuthenticated-------false');
  // User is not allowed
   return res.redirect('#/login');
};