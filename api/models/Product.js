/**
 * Product
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
	id: {
		type:'integer',
		autoIncrement: true
	},
  	sn: {
		type:'string',
		required: 'true'
	},
	proname:{
		type:'string',
		defaultsTo: '未知商品',
		required: 'true'
	},
	classify: {
		type:'string',
		required: 'true'
	},
	oldprice: { //原价
		type:'float',
		required: 'true'
	},
	price: {
		type:'float',
		required: 'true'
	},
	imgurl: {
		type:'string'
	},
	pics: {	//高清图集
		type:'array'
	},
	producturl: {
		type:'string'
	},
	regdate:{
		type:'date',
		required: 'true'
	},
	salescount:{
		type:'integer',
		defaultsTo: 0,
		required: 'true'
	},
	inventory:{		//库存
		type:'integer',
		required: 'true'
	},
	merchant:{
		type:'string',
		defaultsTo: '橘子',
		required: 'true'
	},
	color:{
		type:'string',
		required: 'true'
	},
	colors: {		//商品颜色集
		type: 'array',
		required: 'true'
	},
	combos: {		//套餐
		type: 'json'
	},
	desc:{
		type:'string',
		required: 'true'
	},
	tag: {
		type:'string'
	}
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
