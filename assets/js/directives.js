'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('userAddr',function(){
    return {
        restrict: 'AE',
        replace: true,
        template: 
		'<div ng-repeat="addr in addrs">' +
			'<dl class="item">' +
				'<dt>' +
					'<strong class="itemConsignee">{{addr.name}}</strong>' +
					'<span class="itemTag tag">{{addr.tag}}</span>' +
				'</dt>' +
				'<dd>' +
					'<p class="tel itemTel">{{addr.tel}}</p>' +
					'<p class="itemRegion">{{addr.province}} {{addr.city}} {{addr.county}}</p>' +
					'<p class="itemStreet">{{addr.street}} ({{addr.zipcode}})</p>' +
					'<a class="edit-btn J_editAddr" ng-click="editAddr(addr.id)">编辑</a>' +
					'<a class="edit-btn J_delAddr" ng-click="delAddr(addr.id)">删除</a>' +
				'</dd>' +
			'</dl>' +
		'</div>',
		link: function(scope,elem,attr){
            elem.bind('mouseover',function(){
                elem.css('background','#ddd7d7');
            });
        }
    };
	}).directive('orderList',function(){
		return {
			restrict: 'AE',
			replace: true,
			template: 
			'<li class="uc-order-detail-item" ng-repeat="order in orders">' +
				'<table class="order-detail-table">' +
					'<thead>' +
						'<tr>'+
							'<th class="column-info column-t" colspan="3" >'+
								'<div class="column-content">'+
									'<span class="order-status">{{order.status}}</span>'+
									'                                                                                                                 订单号:   <a href="">{{order.id}}</a>'+
									'<span class="sep">|</span>'+
									'{{order.addrname}}<span class="sep">|</span>{{order.orderdate}}'+
								'</div>'+
							'</th>'+
						'</tr>'+
					'</thead>' +
					'<tbody>' +
						'<tr>'+
							'<td class="column-detail column-l">'+
								'<ul class="order-goods-list">'+
                                    '<li ng-repeat="pf in order.proinfo" ng-class="{first: $first}">'+
                                        '<a target="_blank" href="{{pf.producturl}}"><img class="goods-thumb" src={{pf.imgurl}} srcset="></a>'+
                                        '<a target="_blank" href="{{pf.producturl}}" class="goods-name">{{pf.proname}} {{pf.color}}</a>'+
                                        '<span class="goods-price">{{pf.price}} * {{pf.count}}元</span>'+
                                        '<span class="goods-link"></span>'+                                                               
									'</li>'+
                                '</ul>'+
							'</td>'+
							'<td class="column-price">'+
                                '<div class="order-price">'+
                                    '{{order.price}}元<br>在线支付  '+
                                '</div>'+
                            '</td>'+
							'<td class="column-action column-r">'+
                                '<div class="order-action">'+
                                    '<a href="">订单详情&gt&gt</a>'+
                                    '<a class="btn btn-primary btn-small" href="" target="_blank">立即支付</a>'+                                            
                                '</div>'+
                            '</td>'+
						'</tr>'+
					'</tbody>' +
				'</table>' +
			'</li>'
		};
	});
