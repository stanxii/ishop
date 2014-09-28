/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    username: {
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
  }

};
