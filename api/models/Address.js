/**
 * Address
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
	userid: {
		type:'string',
		required: 'true'
	},
	name: {
		type:'string',
		required: 'true'
	},
	tel: {
		type:'string',
		required: 'true'
	},
	province: 'string',
	city: 'string',	
	county: 'string',
	zipcode: 'string',
	street: 'string',
	tag: 'string'
    
  }

};