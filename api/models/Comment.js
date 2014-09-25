/**
 * Comment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	answerid: {
		type:'string',
		required: 'true'
	},
	answernick: {
		type:'string',
		required: 'true'
	},
	content: {
		type:'string',
		required: 'true'
	},
	tag: {
		type:'string',
		enum: ['推荐', '一般', '差劲']
	},
	owner:{
        model:'Porduct'
    }
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
