/**
 * ProductController
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
 
function DateFormat(formatStr, date)   
{   
	var str = formatStr;   
	var Week = ['日','一','二','三','四','五','六'];  
	str=str.replace(/yyyy|YYYY/,date.getFullYear());   
	str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
  
	str=str.replace(/MM/,(date.getMonth()+1)>9?(date.getMonth()+1).toString():'0' + (date.getMonth()+1));   
	str=str.replace(/M/g,(date.getMonth()+1));   
  
	str=str.replace(/w|W/g,Week[date.getDay()]);   
  
	str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());   
	str=str.replace(/d|D/g,date.getDate());   
  
	str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());   
	str=str.replace(/h|H/g,date.getHours());   
	str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());   
	str=str.replace(/m/g,date.getMinutes());   
  
	str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());   
	str=str.replace(/s|S/g,date.getSeconds());   
  
	return str;   
}

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/product/create`
   */
   create: function (req, res) {
    var sn = req.param('sn');
	var proname = req.param('proname');
	var classify = req.param('classify');
	var price = req.param('price');
	var imgurl = req.param('imgurl');
	var pics = req.param('pics');
	var producturl = req.param('producturl');
	var regdate = req.param('regdate');
	var inventory = req.param('inventory');
	var color = req.param('color');
	var colors = req.param('colors');
	var combos = req.param('combos');
	var desc = req.param('desc');
	var tag = req.param('tag');
    // Send a JSON response
	console.log('------------product create------------------');
	Product.create({
		sn: sn, classify: classify, price: price, imgurl: imgurl,pics:pics, proname: proname,
		regdate: regdate, inventory: inventory, color:color, colors:colors, combos:combos, desc: desc, tag: tag, producturl: producturl
	}).exec( function(err, r){
		if(err){
			console.log(JSON.stringify(err));
			return res.json({
			  sts: 1
			});
		}
		return res.json({
		  sts: 0
		});
	})
    
  },


  /**
   * Action blueprints:
   *    `/product/del`
   */
   del: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/product/findById`
   */
   findById: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },
  
    /**
   * Action blueprints:
   *    `/product/findBySn`
   */
   findBySn: function (req, res) {
    var sn = req.param('sn');
	console.log('--------findBySn----------'+ sn);
	Product.findOne({sn: sn}).done(function(err, result){
		if(err){
			console.log('--------findBySn err----------'+JSON.stringify(err));
			return false;
		}
		// Send a JSON response
		console.log('--------findBySn ----------'+ JSON.stringify(result));
		return res.json(result);
	});
    
  },


  /**
   * Action blueprints:
   *    `/product/findByUser`
   */
   findByUser: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/product/findAll`
   */
   findAll: function (req, res) {
    Product.runCommand("text", {search: "小米"}).done(function(err, result){
		if(err){
			console.log('--------findBySn err----------'+JSON.stringify(err));
			return false;
		}
		// Send a JSON response
		console.log('--------findBySn ----------'+ JSON.stringify(result));
		return res.json(result);
	});

  },


  /**
   * Action blueprints:
   *    `/product/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ProductController)
   */
  _config: {}

  
};
