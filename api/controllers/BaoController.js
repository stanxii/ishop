/**
 * BaoController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/bao/create`
   */
   create: function (req, res) {
	 //create one
	var socket = req.socket;
	var io = sails.io;
        io.sockets.emit("message",{"hello":"fuck"});

	//emit to allsockets
        var bao =Bao.create({
		   name: 'JZ-LP-0001',
		   sn:'LP-000001',
		   cat: 'LED POWER',
		   size:'30x120x20 mm',
		   img: '/img/lp-000001.jpg'
		   }).done(function(err, bao) {
	
	         // Error handling
	           if (err) {
	               return console.log(err);
	
	           // The User was created successfully!
	            }else {
    		       //return res.json(bao.toJSON());
	               console.log("Bao created:", bao);
    		       return res.json(bao);
	            }
	  });    
    // Send a JSON response
  },


  /**
   * Action blueprints:
   *    `/bao/drop`
   */
   drop: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/bao/tag`
   */
   tag: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/bao/like`
   */
   like: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/bao/search`
   */
   search: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BaoController)
   */
  _config: {}

  
};
