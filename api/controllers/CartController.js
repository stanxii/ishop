/**
 * CartController
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
   *    `/cart/create`
   */
   create: function (req, res) {
    var sn = req.param('psn');
	var proname = req.param('proname');
	var classify = req.param('classify');
	var price = req.param('price');
	var imgurl = req.param('imgurl');
	var regdate = DateFormat('yyyy-MM-dd hh:mm:ss',new Date());
	var color = req.param('color');
	var desc = req.param('desc');
	var tag = req.param('tag');
	var merchant = req.param('merchant');
	var buynum = req.param('buynum');
	console.log('------ -authenticated------' + req.session.authenticated);
	if((!req.session.authenticated) || (req.session.authenticated == 'undefined')){
		console.log('------not -authenticated------');
		return res.json({sts: 2});
	};
	Cart.count({userid: req.session.userid}).exec(function countCB(err,r){
		if(err){
			// Send a JSON response
			console.log('-------'+JSON.stringify(err));
			return res.json({sts: 1});
		};
		console.log('------cart count----'+ r);
		if(r > 10){
			return res.json({sts: 3});//购物车已满
		};
	});
	Cart.create({userid: req.session.userid, sn: sn, proname: proname, classify: classify, price: price, imgurl: imgurl,
		count: buynum, desc: desc, tag: tag, color: color, merchant: merchant}).exec(function createCB(err, r){
		if(err){
			// Send a JSON response
			console.log('-------'+JSON.stringify(err));
			return res.json({sts: 1});
		}
		return res.json({sts: 0});
	});
    
  },


  /**
   * Action blueprints:
   *    `/cart/del`
   */
   del: function (req, res) {
    var id = req.param('id');
    // Send a JSON response
	Cart.destroy({id: id}).exec(function  deleteCB(err,r){
		if(err){
			// Send a JSON response
			console.log('-------'+JSON.stringify(err));
			return res.json({sts: 1});
		}
		return res.json({sts: 0});
	});    
  },
  
  /**
   * Action blueprints:
   *    `/cart/drop`
   */
   drop: function (req, res) {
    // Send a JSON response
	Cart.destroy().exec(function  deleteCB(err,r){
		if(err){
			// Send a JSON response
			console.log('-------'+JSON.stringify(err));
			return res.json({sts: 1});
		}
		return res.json({sts: 0});
	});    
  },
  
    /**
   * Action blueprints:
   *    `/cart/ts`
   */
   ts: function (req, res) {
    var data = req.param('data');
    // Send a JSON response
	req.session.cartinfo = data;
	return res.json({sts: 0});
  },
  
   /**
   * Action blueprints:
   *    `/cart/getTs`
   */
   getTs: function (req, res) {
    // Send a JSON response
	return res.json(req.session.cartinfo);
  },


  /**
   * Action blueprints:
   *    `/cart/findAll`
   */
   findAll: function (req, res) {
    var userid = req.session.userid;
	Cart.find({userid: userid}).exec(function findCB(err, result) {
		if(err){
			return res.json({sts: 2});
		}
		// Send a JSON response
		return res.json(result);
	});
    
  },

   /**
   * Action blueprints:
   *    `/cart/count`
   */
   count: function (req, res) {
    var userid = req.session.userid;
	Cart.count({userid: userid}).exec(function countCB(err,num){
		if(err){
			return res.json({sts: 2});
		}
		if(num >0){
			// Send a JSON response
			return res.json({
			  sts: 0,
			  num: num
			});
		}else{
			return res.json({
			  sts: 1
			});
		}
	});
    
  }
};
