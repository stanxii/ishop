/**
 * OrderController
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
   *    `/order/create`
   */
   create: function (req, res) {
    var addrid = req.param('addrid');
	var payway = req.param('payway');
	var cartinfo = JSON.stringify(req.param('cartinfo'));
	var pricetotal = req.param('pricetotal');
	var status = '等待付款';
	var orderdate = DateFormat('yyyy-MM-dd hh:mm:ss',new Date());
	//console.log('--cartinfo---'+ cartinfo);
	Address.find({id: addrid}).done(function(err,addr){
		if(err){
			return console.log(err);
		};
		Order.create({
			price:pricetotal, status:status, orderdate:orderdate, userid:req.session.userid, 
			addrid:addrid, addrname: addr[0].name, proinfo:cartinfo
		}).exec( function(err, result){
			if(err){
				console.log('----err---'+ JSON.stringify(err));
				return res.json({
				  sts: 1
				});
			}
			// Send a JSON response
			return res.json({
			  sts: 0
			});
		});
	
	});
	
    
  },


  /**
   * Action blueprints:
   *    `/order/del`
   */
   del: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/order/findAll`
   */
   findAll: function (req, res) {    
    //var userid = req.param('userid');
    // Send a JSON response
	//console.log('------/order/findAll----'+req.session.userid);
	Order.find({ where: {userid: req.session.userid}, sort:'createdAt DESC'}).exec(function(err,result){
		if(err){
			return console.log(err);
		}		
		console.log('----orders---->>>>>>'+JSON.stringify(result));
		return res.json( result );
	
	});
  },


  /**
   * Action blueprints:
   *    `/order/find`
   */
   find: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },	

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to OrderController)
   */
  _config: {}

  
};
