/**
 * Bao
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
	name: 'string',
	id: 'string',
	cat: 'string',
	size: 'string',
	img: {
		type:'string',
		required: 'true'
	}
    
  }

};
