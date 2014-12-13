/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
// var crypto = require('crypto');

// function encryptPassword(password) {
// 	return crypto.createHash("md5").update(password).digest("base64");
// }

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

	//var enpass = encryptPassword('conformPassword');

	//console.log('--------name:'+name);
	User.find()
	.where({usermail:usermail})
	.then(function(err, user){
		if(err){
			console.log('---fidnone user error'+ JSON.stringify(err) )
			return res.send(400);
		}
		if(user){
			//user exist do not need register
			return res.send(10001);
		}else{
			//create
			//user not exist now will create 
			User.create({
				   usermail: usermail,
				   password: password,
				   role: role
				}).exec(function createCB(err, user) {
					if(err){
						console.log('--create----error----'+JSON.stringify(err));
						return res.send(400);
					}
					console.log('--create----xxxx----'+JSON.stringify(user));
					console.log('--now get objid to string='+ JSON.stringify(user.toJSON()));

					return res.send(200);
				    
				});	
		}
	});

    
	
  },


  /**
   * `UserController.delete()`
   */
  delete: function (req, res) {
    var name = req.param('username');
	User.destroy({
	  name: name
	}).exec(function deleteCBCB(err) {

	  // Error handling
	  if (err) {
		return console.log(err);

	  // Johnny was deleted!
	  } else {
		// Send a JSON response
		return res.json({
		  status: 0
		});
	  }
	});    
  },


  

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    var name = req.param('username');		
	var password = req.param('password');		
	User.findOne({username: name}).exec(function findOneCB(err, user){
		if (err) {
			console.log('--find----error----');
			return console.log(err);
		  // Found multiple users!
		} else {
			//console.log('--find----user----'+JSON.stringify(user));
			if(user == null){
				return res.json({sts: 2});//user not exist
			}
			if(encryptPassword(password) == user.password){				
				req.session.authenticated = true;
				req.session.user = name;
				req.session.userid = user.id;
				return res.json({sts: 0,userid: user.id});//success
			}else {
				return res.json({sts: 1,userid: user.id});//password error
			}
			
		}
		
	});
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    req.session.authenticated = false;
	req.session.user = '';
	return res.json({status: 0});
  },


  /**
   * `UserController.findOne()`
   */
  findOne: function (req, res) {
    var name = req.param('username');			
	User.findOne({username: name}).exec(function findOneCB(err, user){
		if (err) {
			return console.log(err);
		  // Found multiple users!
		} else {
			//console.log('--find----password----'+JSON.stringify(user));
			return res.json(user);
		}
		
	});
  },


  /**
   * `UserController.update()`
   */
  update: function (req, res) {
    var id = req.param('id');
	var pass = req.param('password');
	var oldpass = req.param('oldpassword');
	User.findOne({id: id}).exec(function afterwards(err, user){
		if (err) {
			return res.json({sts:1});
		  // Found multiple users!
		} else {				
			if(user){
				console.log('--update----password----'+user.password + '----oldpassword-----'+ encryptPassword(oldpass));
				if(encryptPassword(oldpass) != user.password){
					return res.json({sts:2});
				}
				user.password = encryptPassword(pass);
				user.save(function(error) {
					if(error) {
						return res.json({sts:1});
					} else {
						// value saved!
						return res.json({sts:0});
					}
				});
				
			}else{
				return res.json({sts:1});
			}
			
		}
		
	});
  }
};

