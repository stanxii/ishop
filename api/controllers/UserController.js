/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
 var crypto = require('crypto');

 function encryptPassword(password) {
 	return crypto.createHash("md5").update(password).digest("base64");
 }

module.exports = {
	

  /**
   * `UserController.create()`
   */
	register: function (req, res) {
			var usermail = req.param('usermail');
			var password = req.param('password');
			var role = req.param('role');
			var passwordConfirmation = req.body.passwordConfirmation || '';

			if (usermail == '' || password == '' || password != passwordConfirmation) {
			return res.send(400);
			}

			User.count({usermail:usermail}).exec(function countCB(error, found) {
				if(error){
					console.log('--create----error----'+JSON.stringify(err));
					return res.send(400);
				}
				console.log('There are ' + found + ' users called User---'+ usermail);

				if(0 == found){
					var enpass = encryptPassword(password);
					
					User.create({
						usermail: usermail,
						password: enpass,
						role: role
					}).exec(function createCB(error,user){
						if(error){
							console.log('--create----error----'+JSON.stringify(err));
							return res.send(400);
						}
							console.log('Created user with name '+user.usermail);
							console.log('--create----xxxx----'+JSON.stringify(user));
							console.log('--now get objid to string='+ JSON.stringify(user.toJSON()));
							return res.send(200);
					});

				}else{
					//user already exist cant register
					return res.send(1001);
				}	 
		   });
	
  	}
};

