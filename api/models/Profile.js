/**
* Profile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	uid: {
		  type:'string',
		  unique: true,
		  required: true
	},

	personalInfo: {
	},

	jobPreferences: {
	},

	education: {
	},

	workHistory: {
	},

	summary: {
	},


	toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

