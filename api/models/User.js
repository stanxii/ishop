/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    usermail: {
		  type:'string',
		  unique: true,
		  required: true
	  },
    password: {
		  type:'string',
		  required: true
	  },
    // Override toJSON instance method
    // to remove password value
     toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    } 
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }

};
