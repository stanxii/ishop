/**
 * AddrController
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

var fs = require('fs');
 
module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/addr/create`
   */
   create: function (req, res) {    
    var userid = req.param('userid');
    var name = req.param('nickname');
	var tel = req.param('tel');
	var province = req.param('province');
	var city = req.param('city');
	var county = req.param('county');
	var zipcode = req.param('zipcode');
	var street = req.param('street');
	var tag = req.param('tag');
	switch(province){
		case '2':
			province = '北京';
			break;
		case '3':
			province = '天津';
			break;
		case '4':
			province = '河北';
			break;
		case '5':
			province = '山西';
			break;
		case '6':
			province = '内蒙古';
			break;
		case '7':
			province = '辽宁';
			break;
		case '8':
			province = '吉林';
			break;
		case '9':
			province = '黑龙江';
			break;
		case '10':
			province = '上海';
			break;
		case '11':
			province = '江苏';
			break;
		case '12':
			province = '浙江';
			break;
		case '13':
			province = '安徽';
			break;
		case '14':
			province = '福建';
			break;
		case '15':
			province = '江西';
			break;
		case '16':
			province = '山东';
			break;
		case '17':
			province = '河南';
			break;
		case '18':
			province = '湖北';
			break;
		case '19':
			province = '湖南';
			break;
		case '20':
			province = '广东';
			break;
		case '21':
			province = '广西';
			break;
		case '22':
			province = '海南';
			break;
		case '23':
			province = '重庆';
			break;
		case '24':
			province = '四川';
			break;
		case '25':
			province = '贵州';
			break;
		case '26':
			province = '云南';
			break;
		case '27':
			province = '西藏';
			break;
		case '28':
			province = '陕西';
			break;
		case '29':
			province = '甘肃';
			break;
		case '30':
			province = '青海';
			break;
		case '31':
			province = '宁夏';
			break;
		case '32':
			province = '新疆';
			break;
	}
	console.log('--------name:'+name + '-'+tel+'-'+province+'-'+city+'-'+county+'-'+zipcode+'-'+street+'-'+tag);
	var addr = Address.create({
		   userid: userid,
		   name: name,
		   tel: tel,
		   province: province,
		   city: city,
		   county: county,
		   zipcode: zipcode,
		   street: street,
		   tag: tag
		}).exec(function createCB(err, addr) {
			//console.log('--create----xxxx----'+JSON.stringify(addr));
			if(err){
				console.log('--err--------'+err);
				return res.json({sts: 1});
			}
		   return res.json({sts: 0});
		});
  },


  /**
   * Action blueprints:
   *    `/addr/del`
   */
   del: function (req, res) {
    var addrid = req.param('addrid');
    Address.destroy({
	  id: addrid
	}).exec(function deleteCB(err) {
	  // Error handling
	  if (err) {
		return console.log(err);
	  } else {
		// Send a JSON response
		return res.json({
		  sts: 0
		});
	  }
	}); 
  },


  /**
   * Action blueprints:
   *    `/addr/findCities`
   */
   findCities: function (req, res) {
    var proid = req.param('proid');
	var str = fs.readFileSync('../ishop/api/res/cities.json','utf-8');
	var json = JSON.parse(str);
	var flag = 'c'+ proid;
	//console.log('------city----'+JSON.stringify(json.c3) + '========' + JSON.stringify(json['c3']));
	return res.json(json[flag]);
  },
  
    /**
   * Action blueprints:
   *    `/addr/findDistricts`
   */
   findDistricts: function (req, res) {
    var proid = req.param('proid');
	var city = req.param('city');
	var province = "";
	switch(proid){
		case '2':
			province = "beijin";
			break;
		case '3':
			province = "tianjin";
			break;
		case '4':
			province = "hebei";
			break;
		case '5':
			province = "shanxi";
			break;
		case '6':
			province = "neimenggu";
			break;
		case '7':
			province = "liaonin";
			break;
		case '8':
			province = "jilin";
			break;
		case '9':
			province = "heilongjiang";
			break;
		case '10':
			province = "shanghai";
			break;
		case '11':
			province = "jiangsu";
			break;
		case '12':
			province = "zhejiang";
			break;
		case '13':
			province = "anhui";
			break;
		case '14':
			province = "fujian";
			break;
		case '15':
			province = "jiangxi";
			break;
		case '16':
			province = "shandong";
			break;
		case '17':
			province = "henan";
			break;
		case '18':
			province = "hubei";
			break;
		case '19':
			province = "hunan";
			break;
		case '20':
			province = "guangdong";
			break;
		case '21':
			province = "guangxi";
			break;
		case '22':
			province = "hainan";
			break;
		case '23':
			province = "chongqing";
			break;
		case '24':
			province = "sichuan";
			break;
		case '25':
			province = "guizhou";
			break;
		case '26':
			province = "yunnan";
			break;
		case '27':
			province = "xizang";
			break;
		case '28':
			province = "shanxi1";
			break;
		case '29':
			province = "gansu";
			break;
		case '30':
			province = "qinghai";
			break;
		case '31':
			province = "ningxia";
			break;
		case '32':
			province = "xinjiang";
			break;
		default:
			return res.json({sts: 2});
			break;
	}
	fs.readFile('../ishop/api/res/'+ province +'.json','utf-8', function(err, data){
		if(err){
			console.log('------err----'+err);
			return res.json({sts: 1});
		}
		//console.log('------cityxxxxx----'+data);
		var json = JSON.parse(data);
		//console.log('------city----'+JSON.stringify(json));
		return res.json(json[city]);
	});		
  },

  /**
   * Action blueprints:
   *    `/addr/findById`
   */
   findById: function (req, res) {
    var addrid = req.param('addrid');
	Address.find({id: addrid}).exec(function findCB(err,addr){
		if(err){
			return console.log(err);
		}
		return res.json( addr );
	
	});
  },
  

  /**
   * Action blueprints:
   *    `/addr/findAll`
   */
   findAll: function (req, res) {
    var userid = req.session.userid;
    // Send a JSON response
	//console.log('------/addr/findAll----'+userid);
	Address.find({userid: userid}).exec(function findCB(err,addrs){
		if(err){
			return console.log(err);
		}
		return res.json( addrs );
	
	});
  },

	/**
   * Action blueprints:
   *    `/addr/update`
   */
	update: function (req, res) {
		var addrid = req.param('addrid');
		var userid = req.param('userid');
		var name = req.param('nickname');
		var tel = req.param('tel');
		var province = req.param('province');
		var city = req.param('city');
		var county = req.param('county');
		var zipcode = req.param('zipcode');
		var street = req.param('street');
		var tag = req.param('tag');
		switch(province){
			case '2':
				province = '北京';
				break;
			case '3':
				province = '天津';
				break;
			case '4':
				province = '河北';
				break;
			case '5':
				province = '山西';
				break;
			case '6':
				province = '内蒙古';
				break;
			case '7':
				province = '辽宁';
				break;
			case '8':
				province = '吉林';
				break;
			case '9':
				province = '黑龙江';
				break;
			case '10':
				province = '上海';
				break;
			case '11':
				province = '江苏';
				break;
			case '12':
				province = '浙江';
				break;
			case '13':
				province = '安徽';
				break;
			case '14':
				province = '福建';
				break;
			case '15':
				province = '江西';
				break;
			case '16':
				province = '山东';
				break;
			case '17':
				province = '河南';
				break;
			case '18':
				province = '湖北';
				break;
			case '19':
				province = '湖南';
				break;
			case '20':
				province = '广东';
				break;
			case '21':
				province = '广西';
				break;
			case '22':
				province = '海南';
				break;
			case '23':
				province = '重庆';
				break;
			case '24':
				province = '四川';
				break;
			case '25':
				province = '贵州';
				break;
			case '26':
				province = '云南';
				break;
			case '27':
				province = '西藏';
				break;
			case '28':
				province = '陕西';
				break;
			case '29':
				province = '甘肃';
				break;
			case '30':
				province = '青海';
				break;
			case '31':
				province = '宁夏';
				break;
			case '32':
				province = '新疆';
				break;
		}
		console.log('--------name:'+name + '-'+tel+'-'+province+'-'+city+'-'+county+'-'+zipcode+'-'+street+'-'+tag);
		Address.update({id: addrid},{
			userid: userid,
			name: name,
			tel: tel,
			province: province,
			city: city,
			county: county,
			zipcode: zipcode,
			street: street,
			tag: tag
		}).exec(function afterwards(err,updated){
		  if (err) {
			// handle error here- e.g. `res.serverError(err);`
			return res.json( {sts: 1} );
		  }
		  console.log('Updated user to have name '+updated[0].name);
		  return res.json( {sts: 0} );
		});
	}
};
