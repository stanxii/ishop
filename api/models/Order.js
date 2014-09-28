/**
 * Order
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	sn: {
		type:'integer',
		autoIncrement: true
	},
	status: {
		type: 'string',
		enum: ['等待付款', '已付款', '已关闭']
	},
	orderdate:{
		type:'string',
		required: 'true'
	},
	price: {
		type:'float',
		required: 'true'
	},
	userid:{
		type:'string',
		required: 'true'
	},
	addrid:{
		type:'string',
		required: 'true'
	},
	addrname:{
		type:'string',
		required: 'true'
	},
	proinfo:{
		type:'string',
		required: 'true'
	}
	/*
	//proinfo
	sn: {
		type:'string',
		required: 'true'
	},	
	proname:{
		type:'string',
		required: 'true'
	},
	classify: {
		type:'string',
		required: 'true'
	},
	price:{
		type:'float',
		required: 'true'
	},
	imgurl:{
		type:'string'
	},
	desc:{
		type:'string',
		required: 'true'
	},
	tag:{
		type:'string',
		required: 'true'
	},
	merchant:{
		type:'string',
		required: 'true'
	},
	color:{
		type:'string',
		required: 'true'
	},
	count: {
		type:'integer',
		required: 'true'
	}
	*/
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
