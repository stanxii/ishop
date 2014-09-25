/**
 * Cart
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
	userid: {
		type:'string',
		required: 'true'
	},
  	sn: {
		type:'string',
		required: 'true'
	},
	proname: {
		type:'string',
		required: 'true'
	},
	classify: {
		type:'string',
		required: 'true'
	},
	price: {
		type:'float',
		required: 'true'
	},
	count: {
		type:'integer',
		required: 'true'
	},
	imgurl: 'string',
	desc: {
		type:'string',
		required: 'true'
	},
	color: {
		type:'string',
		required: 'true'
	},
	tag: {
		type:'string',
		required: 'true'
	},
	merchant: 'string'
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
