// 百度地图API功能
'use strict';

app.controller('BMapCtrl', ['$scope', function($scope){
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.404, 39.915); //中心点和经纬度
    map.centerAndZoom(point, 15);//数字越小，显示范围越大
}]);



