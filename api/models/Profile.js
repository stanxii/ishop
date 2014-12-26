/**
* Profile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {  	
  	userid: {
		  type:'string',
		  unique: true,
		  required: true
	},

	personalInfo: {
		model: 'personalInfo'
	},

	jobPreferences: {
		model: 'jobPreferences'
	},

	education: {
		model: 'education'
	},
	
	workHistory: {
		model: 'workHistory'
	},

	summary: {
		model: 'Summary'		
	},


	toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

