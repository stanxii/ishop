/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var crypto = require('crypto');

function encryptPassword(password) {
	return crypto.createHash("md5").update(password).digest("base64");
}

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/user/create`
   */
   create: function (req, res) {
    var name = req.param('username');
	var password = req.param('password');
	var enpass = encryptPassword(password);
	//console.log('--------enpass:'+enpass);
	var user = User.create({
		   username: name,
		   password: enpass
		}).done(function(err, user) {
			//console.log('--find----xxxx----'+JSON.stringify(user));
		   return res.json(user);
		});
  },

  /**
   * Action blueprints:
   *    `/user/delete`
   */
   delete: function (req, res) {
	var name = req.param('username');
	User.destroy({
	  name: name
	}).done(function(err) {

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
	/*access authentication */
	auth: function(req, res, next) {
		return res.json({status: 0});//success
		//return next();
	},
	
	checklogin: function(req, res) {
		if(req.session.authenticated){
			//console.log('--find----userid----'+req.session.userid);
			return res.json({name: req.session.user,id: req.session.userid});//success
		}else{
			return res.json({name: '', id:''});//false
		}
		//return res.json({status: 0});//success
	},
  
    /**
   * Action blueprints:
   *    `/user/login`
   */
   login: function (req, res) {
	var name = req.param('username');		
	var password = req.param('password');		
	User.findOne({username: name}).done(function(err, user){
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
    // Send a JSON response
    //return res.json(user);
  },
  
   /**
   * Action blueprints:
   *    `/user/logout`
   */
   logout: function (req, res) {
	req.session.authenticated = false;
	req.session.user = '';
	return res.json({status: 0});  
  },


  /**
   * Action blueprints:
   *    `/user/findOne`
   */
   findOne: function (req, res) {
	var name = req.param('username');			
	User.findOne({username: name}).done(function(err, user){
		if (err) {
			return console.log(err);
		  // Found multiple users!
		} else {
			//console.log('--find----password----'+JSON.stringify(user));
			return res.json(user);
		}
		
	});
    // Send a JSON response
    //return res.json(user);
  },
  
    /**
   * Action blueprints:
   *    `/user/findAll`
   */
   findAll: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/user/update`
   */
   update: function (req, res) {
		var id = req.param('id');
		var pass = req.param('password');
		var oldpass = req.param('oldpassword');
		User.findOne({id: id}).done(function(err, user){
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
  },


	

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
