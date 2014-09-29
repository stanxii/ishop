'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
	.controller('LayoutController', ['$scope', '$sails',  function($scope, $sails ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		$scope.title = "橘子网";
/* 		$scope.sinup = "注册";
		$scope.logIn = "登录"; */
		$scope.orders = "我的订单";
		$scope.mobile = "橘子网移动版";
		$scope.bbs = "橘子网论坛";
		$scope.about = "关于橘子";
		if($scope.userid == '' || $scope.userid == undefined){
			$sails.get('/user/checklogin').success(function (user) {
				$scope.resetLogin(user);
				$scope.userid = user.id;
				//alert('-------0-----' +$scope.userid );
			})
			.error(function (data) {
					alert('checklogin, we got a problem!');
			});
		}

		$scope.resetLogin = function (user) {
            if (user.name) {	
                $scope.logIn = {
                    url:'userinfo?id='+user.id,
                    name:'欢迎:' + user.name
                };
                $scope.signup = {
                    url:'logout',
                    name:'注销'
                };
            } else {
                $scope.logIn = {
                    url:'login',
                    name:'登录'
                };
                $scope.signup = {
                    url:'signup',
                    name:'注册'
                };
            }
        };
		
		/*$scope.mouseEnter = function(){
			$scope.mouse = 'block';
		};
		$scope.mouseLeave = function(){
			$scope.mouse = 'none';
		};*/
	}])
	.controller('goodsMobileCtrl', ['$scope', '$sails', '$location', '$modal', '$timeout',  function($scope, $sails, $location, $modal, $timeout ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		$scope.sn = $location.absUrl().substring($location.absUrl().indexOf('?') + 4);
		$scope.isSelected = 1;
		$scope.picSelected = 1;
		$scope.buynum = 1;
		$scope.proConurl = '';
		$sails.get('/user/checklogin').success(function (user) {
			//获取购物车信息
			if(user.name){
				$sails.get("/cart/count").success(function (num) {
					if(num.sts == 0){
						$scope.count =  num.num ;
					}else{
						$scope.count = 0;
					}
				});
			}
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});
		
		$sails.get('/product/findBySn',{sn: $scope.sn}).success(function (product) {
			//获取商品信息
			if(product){
				$scope.productinfo = product;
				$scope.proConurl = product.pics[0];
			}else{
				alert('---获取商品信息错误----');
				
			}
			
        })
		.error(function (data) {
				alert('product/findBySn, we got a problem!');
		});
		
		$scope.updateprice = function(){
			
		};
		
		$scope.open = function (size) {		
			$sails.post('/cart/create',{proname: $scope.productinfo.proname, psn: $scope.productinfo.sn, classify: $scope.productinfo.classify,
				oldprice: $scope.productinfo.oldprice, price: $scope.productinfo.price,
				imgurl: $scope.productinfo.imgurl, merchant: $scope.productinfo.merchant, color: $scope.productinfo.color,
				desc: $scope.productinfo.desc, tag: $scope.productinfo.tag, buynum: $scope.buynum})
			.success(function (r){
				if(r.sts == 2){
					modalInstance.dismiss('cancel');
					$location.path('/login');
				}else if(r.sts == 1){
					alert('---err---'+JSON.stringify(r));
					alert('添加购物车失败!');
					modalInstance.dismiss('cancel');
				}else if(r.sts == 3){
					alert('添加购物车已满!');
					modalInstance.dismiss('cancel');
				}
				$timeout(function() {
				  // run my code safely here
					$scope.$apply(function(){
						$scope.count = $scope.count + 1;
					});
				});
				
			});
				
			var modalInstance = $modal.open({
			  templateUrl: 'cartContent.html',
			  controller: ModalInstanceCtrl,
			  size: size,
			  resolve: {
				items: function () {					
					return $scope.items;
				}
			  }
			});		
			modalInstance.result.then(function (selectedItem) {
			  //$scope.selected = selectedItem;
			  alert('---------runned------------');
			}, function () {
			  //$log.info('Modal dismissed at: ' + new Date());
			});
		};
		
		var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
		  $scope.ok = function () {
			$modalInstance.dismiss('cancel');
			$location.path('/cart');
		  };

		  $scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		  };
		};
		
		$scope.changecolor = function(index){
			switch(index){
				case 1:
					$scope.productinfo.color = $scope.productinfo.colors[0];
					break;
				case 2:
					$scope.productinfo.color = $scope.productinfo.colors[1];
					break;
				case 3:
					$scope.productinfo.color = $scope.productinfo.colors[2];
					break;
				default:
					$scope.productinfo.color = $scope.productinfo.colors[0];
					break;
			}
            $scope.isSelected = index;
		};
		
		$scope.proCon_pics = function(index){
			switch(index){
				case 1:
					$scope.proConurl =  $scope.productinfo.pics[0];
					break;
				case 2:
					$scope.proConurl =  $scope.productinfo.pics[1];
					break;
				case 3:
					$scope.proConurl =  $scope.productinfo.pics[2];
					break;
				case 4:
					$scope.proConurl =  $scope.productinfo.pics[3];
					break;
				case 5:
					$scope.proConurl =  $scope.productinfo.pics[4];
					break;
				default:
					$scope.proConurl =  $scope.productinfo.pics[0];
					break;
					
			
			
			}
			$scope.picSelected = index;
		}

	}])
	.controller('MyCtrl1', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		$sails.get('/user/checklogin').success(function (user) {
			//获取购物车信息
			if(user.name){
				$scope.userid = user.id;
				$sails.get("/cart/count").success(function (num) {
					if(num.sts == 0){
						$scope.count =  num.num ;
					}else{
						$scope.count = 0;
					}
				});
			}
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});		
		
	}])
	.controller('cartCtrl', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		$scope.iscartempty = false;
		$scope.userid = $location.absUrl().substring($location.absUrl().indexOf('?') + 4);
		$sails.get('/user/checklogin').success(function (user) {
            $scope.resetLogin(user);
			$scope.userid = user.id;
			if($scope.userid == ''){
				$location.path('/login');
			}else if($scope.userid == undefined){
				$location.path('/login');
			}
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});		
		$sails.get("/cart/findAll").success(function (data) {	
			//alert('--cart/findAll--'+ JSON.stringify(data));
			if(data == ''){
				$scope.iscartempty = true;
				return;
			}else{
				$scope.iscartempty = false;
				$scope.carts = data;
				$scope.pricetotal = 0.0;
				$scope.carts.forEach(function(i,index){	
					$scope.pricetotal += i.price * i.count; 
					
				});		
				$scope.$watch('carts',function(){
					//实时更新价格信息
					$scope.pricetotal = 0.0;
					$scope.carts.forEach(function(i,index){	
						if(i.count < 1)
							i.count = 1;
						$scope.pricetotal += i.price * i.count; 						
					});	
					
				}, true);
			}
		})
		.error(function (data){
			
		}); 	
		
		$scope.cart_del = function(cartid){
			if(confirm('确定删除么?')){
				$sails.get("/cart/del",{id: cartid}).success(function (r) {	
					if(r.sts == 0){
						window.location.reload();
						
					}
				})
				.error(function (data){
					
				}); 
			}
			
		};
		
		$scope.accounts = function(){
			var data = $scope.carts;
			$sails.post("/cart/ts", {data: data}).success(function (r) {	
				//暂存购物车信息
				$location.path('/buy/checkout');
			});		
		}
	
	}])
	.controller('goodsTvCtrl', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		//$scope.selectedCombo = 0;
		$scope.sn = $location.absUrl().substring($location.absUrl().indexOf('?') + 4);
		$sails.get("/cart/count").success(function (num) {
			if(num.sts == 0){
				$scope.count =  num.num ;
			}else{
				$scope.count = 0;
			}
		});	
		$sails.get('/product/findBySn',{sn: $scope.sn}).success(function (product) {
			//获取商品信息
			if(product){
				$scope.productinfo = product;
				$scope.proCombos = product.combos;
				//alert('---combos--'+ JSON.stringify(product.combos.combo));
			}else{
				alert('---获取商品信息错误----');
				
			}
			
        })
		.error(function (data) {
				alert('product/findBySn, we got a problem!');
		});
		
		$scope.chooseCombo = function( index ) {
			$scope.selectedCombo = index;
		}
		
		$scope.changeColor = function( index ) {
			if(!$scope.selectedCombo)
				return;
			$scope.selectedColor = index;
		}
		
		$scope.addCart = function( ) {
			if(!$scope.selectedCombo || !$scope.selectedColor)
				return;
			$sails.post('/cart/create',{proname: $scope.productinfo.proname, psn: $scope.productinfo.sn, classify: $scope.productinfo.classify,
				oleprice:$scope.productinfo.oldprice, price: $scope.proCombos.combo[$scope.selectedCombo - 1].price,
				imgurl: $scope.productinfo.imgurl, merchant: $scope.productinfo.merchant, color: $scope.productinfo.colors[$scope.selectedColor - 1],
				desc: $scope.productinfo.desc, tag: $scope.proCombos.combo[$scope.selectedCombo - 1].tag, buynum: 1})
			.success(function (r){
				if(r.sts == 2){
					$location.path('/login');
				}else if(r.sts == 1){
					alert('---err---'+JSON.stringify(r));
					alert('添加购物车失败!');
				}else if(r.sts == 3){
					alert('添加购物车已满!');
				}
				$location.path('/cart');
				
			});
		}
		
	}])
	.controller('confirmCtrl', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		//已下单,清除购物车信息
		$sails.get('/cart/drop').success(function (r) {
           
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});		
	}])
	.controller('orderCtrl', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;
		$scope.isempty = true;	
		$sails.get('/user/checklogin').success(function (user) {
            $scope.resetLogin(user);
			$scope.userid = user.id;
			//alert('-------0-----' +$scope.userid );
			if($scope.userid == ''){
				//alert('-------1-----');
				$location.path('/login');
			}else if($scope.userid == undefined){
				//alert('-------2-----');
				$location.path('/login');
			}
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});		
		
		$sails.get("/cart/count").success(function (num) {
			if(num.sts == 0){
				$scope.count =  num.num ;
			}else{
				$scope.count = 0;
			}
		});		
		
		$sails.get("/order/findAll").success(function (data) {	
			if(data == ''){
				
			}else{
				$scope.isempty = false;
				$scope.orders = data;
				//转换购物车信息到JSON格式，以便前端遍历
				$scope.orders.forEach(function(order,i){
					$scope.orders[i].proinfo = JSON.parse(order.proinfo);
				});
				//alert('--------'+JSON.stringify(data[0].proinfo));
			}
		})
		.error(function (data){
			
		});	
	}])
	.controller('userinfoCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location ) {
		/* 隐藏layout部分*/
		$scope.$parent.j_islogin = true;		
		/*提示标签初始化*/
		$scope.V_show = false;
		$scope.N_show = false;
		$scope.P_show = false;

		$scope.userid = $location.absUrl().substring($location.absUrl().indexOf('?') + 4);
		$sails.get("/user/auth").success(function (data) {		
			
		})
		.error(function (data){
			$location.path('/login');
		});
		
		$sails.get("/cart/count").success(function (num) {
			if(num.sts == 0){
				$scope.count =  num.num ;
			}else{
				$scope.count = 0;
			}
		});
		$scope.changePass = function () {
			var oldpass = $scope.oldpassword;
			var password1 = $scope.password1;
			var password2 = $scope.password2;
			/*提示标签初始化*/
			$scope.$parent.V_show = false;
			$scope.$parent.N_show = false;
			$scope.$parent.P_show = false;
			$scope.$apply();
			/* 验证 */
			if(password1 == ''){
				$scope.P_message = '请输入新密码!';
				$scope.$parent.P_show = true;
				return;
			}			
			if(password1 != password2){
				$scope.V_message = '密码输入不一致!';
				$scope.$parent.V_show = true;
				return;
			}
			if(oldpass == password1){
				$scope.P_message = '不能与原密码相同!';
				$scope.$parent.P_show = true;
				return;
			}
			/*  发往服务端更新密码 */
			$sails.get("/user/update", {id: $scope.userid,oldpassword: oldpass, password: password1}).success(function (result) {
				if(result.sts == 0){
					$location.path('/userinfo?id='+$scope.userid);
				}else if(result.sts == 2){
					//原密码输入不正确
					$scope.N_message = '当前密码不正确!!!';
					$scope.$parent.N_show = true;
				}else{
					alert('修改密码失败!!!');
				}
			});
		}

	}])
	.controller('loginCtrl', ['$scope', '$sails', '$location', function( $scope, $sails, $location) {	
		/* 隐藏layout部分*/
		$scope.$parent.j_islogin = false;
		$scope.username = localStorage.getItem("username");
		$scope.password = localStorage.getItem("password");
		if(localStorage.getItem("remember") == "true"){
			$scope.remember = true;
		}else{
			$scope.remember = false;
		}
		$scope.login = function () {
			var username = $scope.username;
			var password = $scope.password;
			var remember = $scope.remember;
			$sails.get("/user/login", {username: username,password: password}).success(function (data) {
				if(data.sts == 2){
					alert('用户名不存在，请先注册！');
					return;
				}
				if(data.sts == 0){
					localStorage.setItem("username",username);
					//alert('---remember2---'+remember);
					if(remember){
						localStorage.setItem("password",password);
						localStorage.setItem("remember",remember);
					}else{
						localStorage.setItem("password","");
						localStorage.setItem("remember",false);
					}
					$scope.resetLogin({name: username,id: data.userid});
					/* 显示layout部分*/
					$scope.$parent.j_islogin = true;
					$location.path('/index');
				}else{
					alert('密码不正确！');
				}
			})
			.error(function (data) {
				alert('Login, we got a problem!');
			});
		};
	}])
	.controller('logoutCtrl', ['$scope', '$sails', '$location', function( $scope, $sails, $location) {		
		$sails.get("/user/logout").success(function (data) {
			$scope.resetLogin({});
			$location.path('/');
		})
		.error(function (data) {
			alert('Houston, we got a problem!');
		});
	}])
	.controller('regCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location ) {	
		/* 隐藏layout部分*/
		$scope.$parent.j_islogin = false;
		$scope.register = function () {
			var username = $scope.username;
			var password = $scope.password;
			$sails.post("/user/create", {username: username,password: password}).success(function (user) {
						//alert('---user---'+user.username);
						localStorage.setItem("username",username);
						localStorage.setItem("password","");
						localStorage.setItem("remember",false);
						$location.path('/login');
					})
					.error(function (data) {
						alert('Houston, we got a problem!');
					});
			/*$sails.get("/user/findOne", {username: username}).success(function (user) {
				if(user != null){
					alert('User has exist!');
					
				}else{
					$sails.post("/user/create", {username: username,password: password}).success(function (user) {
						//alert('---user---'+user.username);
						localStorage.setItem("username",username);
						localStorage.setItem("password","");
						localStorage.setItem("remember",false);
						$location.path('/login');
					})
					.error(function (data) {
						alert('Houston, we got a problem!');
					});
				}
			})*/
			
		};
	}])
	.controller('addressCtrl', ['$scope', '$sails', '$location', function( $scope, $sails, $location) {		
		/* 隐藏layout部分*/
		$scope.$parent.j_islogin = true;		
		/*标签初始化*/
		$scope.iseditAddr = false;
		$scope.addrid = '';
		$scope.cityen = true;
		$scope.districten = true;
		$scope.province = 0;
		$scope.citys = [{"name":"城市/地区/自治州"}];
		$scope.city = $scope.citys[0];
		$scope.countys = [{"name":"区/县"}];
		$scope.district = $scope.countys[0];
		$scope.addrs =[];
		
		
		$scope.userid = $location.absUrl().substring($location.absUrl().indexOf('?') + 4);
		$sails.get('/user/checklogin').success(function (user) {
            $scope.resetLogin(user);
			$scope.userid = user.id;
			//alert('-------0-----' +$scope.userid );
			if($scope.userid == ''){
				//alert('-------1-----');
				$location.path('/login');
			}else if($scope.userid == undefined){
				//alert('-------2-----');
				$location.path('/login');
			}
        })
		.error(function (data) {
				alert('checklogin, we got a problem!');
		});		
		$sails.get('/addr/findAll', {userid: $scope.userid}).success(function (result) {
			//alert('-------------findAddrs-----------------'+ JSON.stringify(result));
			$scope.addrs = result;
		}).error(function (err) {
			alert('addrfindAll, we got a problem!');
		});
		
		$sails.get('/cart/getTs').success(function (result) {
			//alert('-------------getTs-----------------'+ JSON.stringify(result));
			$scope.ts = result;
			$scope.pricetotal = 0.0;
			$scope.buycount = 0;
			$scope.ts.forEach(function(i,index){	
				if(i.count < 1)
					i.count = 1;
				$scope.pricetotal += i.price * i.count; 
				$scope.buycount	+= i.count;			
			});	
		}).error(function (err) {
			alert('getTs, we got a problem!');
		});
		
		$scope.addAddr = function () {
			$scope.addrid = '';
			$scope.name = '';
			$scope.tel = '';
			$scope.zipcode = '';
			$scope.address = '';
			$scope.tag = '';
			$scope.province = 0;
			$scope.city.name = '城市/地区/自治州';
			$scope.district.name = '区/县';
			$scope.iseditAddr = true;
		};
		
		$scope.cancelAdd = function () {
			$scope.iseditAddr = false;
		};
		
		$scope.delAddr = function (addrid) {
			if( (confirm ("确定要删除该地址么?") == true)){
				$sails.get('/addr/del', {addrid: addrid}).success(function (result) {
					//alert('-------------delAddr-----------------'+ JSON.stringify(result));		
					if(result.sts == 0 ){
						window.location.reload(true);
					}else{
						alert("删除失败!!");
					}
				}).error(function (err) {
					alert('delAddr, we got a problem!');
				});
			}
		};
		
		$scope.editAddr = function (addrid) {
			$sails.get('/addr/findById', {addrid: addrid}).success(function (result) {	
				if(result){
					//alert('-------------findById-----------------'+ JSON.stringify(result));
					$scope.addrid = result[0].id;
					$scope.name = result[0].name;
					$scope.tel = '';
					$scope.province = 0;
					$scope.city.name = '城市/地区/自治州';
					$scope.district.name = '区/县';
					$scope.zipcode = result[0].zipcode;
					$scope.address = result[0].street;
					$scope.tag = result[0].tag;
				}else{
					alert("数据同步失败!!");
				}
			}).error(function (err) {
				alert('findById, we got a problem!');
			});
			$scope.iseditAddr = true;
			
		};
		
		$scope.addrSelect = function(addrid){
			$scope.addrselected = addrid;
		};
		
		$scope.proChanged = function () {
			if($scope.province > 0){
				/* 读取省级区域下的市级区域 */
				$sails.get('/addr/findCities', {proid: $scope.province}).success(function (data) {			
					$scope.citys = data;
					$scope.city = data[0];
					$scope.district = $scope.countys[0];
					$scope.cityen = false;	
					$scope.districten = true;
				}).error(function (err) {
					alert('getCities, we got a problem!');
				});						
			}else{
				$scope.cityen = true;
				
			}			
		};
		
		$scope.cyChanged = function () {
			if($scope.city.name != "城市/地区/自治州"){
				/* 读取市级区域下的县区级区域 */			
				$sails.get('/addr/findDistricts', {proid: $scope.province, city: $scope.city.name}).success(function (data) {
					//alert('-------------findDistricts-----------------'+ JSON.stringify(data[0]));		
					if(data.sts == 2){
						alert('----------sts--------该区域还不支持');
						return false;
					}
					$scope.countys = data;
					$scope.district = data[0];
					$scope.cityen = false;	
					$scope.districten = false;
				}).error(function (err) {
					alert('getCities, we got a problem!');
				});					
			}else{
				$scope.districten = true;
			}			
		};
		
		$scope.confirmAdd = function () {
			//验证数据			
			if( $scope.name == ""){
				alert('用户名不能为空');
				return;
			}	
			if(!isTel()){
				return false;
			}
			if($scope.tag == "") {
				alert('请输入标签');
				return;
			}
			if($scope.address == "") {
				alert('请输入街道地址');
				return;
			}
			if($scope.tag.length > 5) {
				alert('标签过长');
				return;
			}
			if( ($scope.province < 2) || ($scope.city.name == "城市/地区/自治州") || ($scope.district.name == "区/县") ){
				alert('请选择省市');
				return;
			}
			if($scope.addrid == ''){
				var postdata = {userid: $scope.userid, nickname:  $scope.name, tel:  $scope.tel, province:  $scope.province, 
				city: $scope.city.name, county: $scope.district.name,
				zipcode: $scope.zipcode, street: $scope.address, tag: $scope.tag};
				$sails.post('/addr/create', postdata).success(function (result) {
					if(result.sts == 0){
						//success
						$scope.iseditAddr = false;
						window.location.reload(true);
					}else{
						alert('sts=1, we got a problem!');
					}
				}).error(function (err) {
					alert('confirmAdd, we got a problem!');
				});
			}else{
				//编辑收货地址
				var postdata = {addrid: $scope.addrid, userid: $scope.userid, nickname:  $scope.name, tel:  $scope.tel, province:  $scope.province, 
				city: $scope.city.name, county: $scope.district.name,
				zipcode: $scope.zipcode, street: $scope.address, tag: $scope.tag};
				$sails.post('/addr/update', postdata).success(function (result) {
					if(result.sts == 0){
						//success
						$scope.iseditAddr = false;
						window.location.reload(true);
					}else{
						alert('update=1, we got a problem!');
					}
				}).error(function (err) {
					alert('/addr/update, we got a problem!');
				});
			}
			
		};
		
		function isTel() {
			//var patrn="^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}";
			if(!(/^1[3|5][0-9]\d{4,8}$/.test($scope.tel))){ 
				alert("不是完整的11位手机号或者正确的手机号前七位"); 				 
				return false; 
			}
			return true;
		};
		
		$scope.orderComfirn = function() {
			if($scope.addrselected =='' || $scope.addrselected == undefined){
				alert('请选择收货地址!!');
				return;
			}
			var json = {'addrid': $scope.addrselected, 'payway': '在线支付', 'cartinfo': $scope.ts, 'pricetotal': $scope.pricetotal + 10};
			$sails.post('/order/create', json).success(function (result) {
					if(result.sts == 0){
						//success
						$location.path('/buy/confirm');
					}else{
						alert('/order/create, we got a problem!');
					}
				}).error(function (err) {
					alert('/order/create, we got a problem!');
				});
		
		
		};
	}])
	.controller('CarouselDemoCtrl', ['$scope', '$sails', '$location', function($scope, $sails, $location ) {	
		$scope.myInterval = 5000;
		var slides = $scope.slides = [];
		$scope.addSlide = function() {
			var newWidth = 600 + slides.length;
			slides.push({
			    image: 'img/' + slides.length + '.png',
			    text: ['小米','大锤','Lots of','Surplus'][slides.length % 4] + ' ' +
				['电视', 'C1', 'Felines', 'Cutes'][slides.length % 4],
				url: ['#/goods/mitv','#/pro_a','#','#'][slides.length % 4]
			});
		};
	    for (var i=0; i<4; i++) {
			$scope.addSlide();
	    }
	}])
	.controller('testCtrl', ['$scope', '$sails', '$location',  function($scope, $sails, $location ) {
		/* 显示layout部分*/
		$scope.$parent.j_islogin = true;	
		$scope.addProduct = function(){
			//add tv
			/*var data = {sn : 'TV1000003', proname : '小米电视2', classify : 'tv',oldprice:3999, price : 3999, imgurl : '../img/product/mitv/tv-jinse.png',
			pics : [],
			producturl : '/goods/mitv', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '香槟金', colors : ['香槟金'],
			combos:{combo:[{desc:'小米电视2 家庭影院版',tag:'含电视、soundbar及低音炮',price:3999},{desc:'小米电视2',tag:'仅电视',price:3399}]},
			desc : '顶配 49 英寸超高清 4K 电视', tag : '测试产品'};*/
			//add c1  mobile
			/*var data = {sn : 'MB1000001', proname : '大锤 C1', classify : 'mobile',oldprice:899, price : 799, imgurl : '../img/product/pro_1.jpg',
			pics : ['c1/1377394349_55_2276.png','c1/1377393383_95_5390.png','c1/1377393385_25_1165.png','c1/1377393386_56_3345.png','c1/1377393390_77_5538.png'],
			producturl : '/goods/c1', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '红盖', colors : ['红盖','黄盖','白盖'],
			combos:{},
			desc : '4.5寸 720P屏幕 4核1.2G处理器 1GRAM+4GROM 前200万摄像头 后800万摄像头，三色呼吸灯，NFC通信，安卓4.1操作系统', tag : '测试产品'};
			*/
			//add c2 mobile
			var data = {sn : 'MB1000002', proname : '大锤 C2', classify : 'mobile',oldprice:1399, price : 1299, imgurl : '../img/product/pro_1.jpg',
			pics : ['c2/1377304636_13_3296.png','c2/1377304642_81_2707.png','c2/1377304645_73_2873.png','c2/1377304653_76_6318.png','c2/1377304665_46_5265.png'],
			producturl : '/goods/c2', regdate : DateFormat('yyyy-MM-dd hh:mm:ss',new Date()), inventory : 100, color : '黑色', colors : ['黑色','白色'],
			combos:{},
			desc : '5寸 1080P屏幕 4核1.5G处理器 1GRAM+16GROM 前500万摄像头 后1300万摄像头，三色呼吸灯，NFC通信，OTG连接，安卓4.2操作系统', tag : '测试产品'};
			//insert product
			$sails.post('/product/create', data).success(function (r) {
				if(r.sts == 1){
					alert('-----create product err------');
				}else{
					alert('-----create product success------');
				}
			});
		};
		
		function DateFormat(formatStr, date)   
		{   
			var str = formatStr;   
			var Week = ['日','一','二','三','四','五','六'];  
			str=str.replace(/yyyy|YYYY/,date.getFullYear());   
			str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));   
		  
			str=str.replace(/MM/,date.getMonth()>9?date.getMonth().toString():'0' + date.getMonth());   
			str=str.replace(/M/g,date.getMonth());   
		  
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
	
	}]);
