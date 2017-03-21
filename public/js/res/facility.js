/**
 * Created by philic on 2017/3/20.
 */
app.controller('ContactCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    // $http.get('js/app/contact/contacts.json').then(function (resp) {
    //     $scope.items = resp.data.items;
    //     $scope.item = $filter('orderBy')($scope.items, 'first')[0];
    //     $scope.item.selected = true;
    // });

    $http({
        method: 'POST',
        url: '/facility/getFacilityCates',
        data: {}
    }).then(function success(res){
        console.log(res);
        $scope.groups = [];
        res.data.map(function(item){
            $scope.groups.push({name: item});
        });
        $http({
            method: 'POST',
            url: '/facility/getAllFacility',
            data: {}
        }).then(function success(res){
            console.log(res);
            $scope.items = res.data;
            $scope.item = $filter('orderBy')($scope.items, 'uid')[0];
            $scope.item.selected = true;
            $scope.filters = $scope.item.name;
        });
    });



    
    $scope.createGroup = function(){
        var group = {name: 'New Group'};
        group.name = $scope.checkItem(group, $scope.groups, 'name');
        $scope.groups.push(group);
    };

    $scope.checkItem = function(obj, arr, key){
        var i=0;
        angular.forEach(arr, function(item) {
            if(item[key].indexOf( obj[key] ) == 0){
                var j = item[key].replace(obj[key], '').trim();
                if(j){
                    i = Math.max(i, parseInt(j)+1);
                }else{
                    i = 1;
                }
            }
        });
        return obj[key] + (i ? ' '+i : '');
    };

    $scope.deleteGroup = function(item){
        $scope.groups.splice($scope.groups.indexOf(item), 1);
    };

    $scope.selectGroup = function(item){
        console.log('hit here');
        angular.forEach($scope.groups, function(item) {
            item.selected = false;
        });
        $scope.group = item;
        $scope.group.selected = true;
        console.log(item.name);
        $scope.filters = item.name;
    };

    $scope.selectItem = function(item){
        angular.forEach($scope.items, function(item) {
            item.selected = false;
            item.editing = false;
        });
        $scope.item = item;
        $scope.item.selected = true;
    };

    $scope.deleteItem = function(item){
        $scope.items.splice($scope.items.indexOf(item), 1);
        $scope.item = $filter('orderBy')($scope.items, 'uid')[0];
        if($scope.item) $scope.item.selected = true;
    };

    $scope.createItem = function(){
        var item = {
            group: 'Friends',
            avatar:'img/a0.jpg'
        };
        $scope.items.push(item);
        $scope.selectItem(item);
        $scope.item.editing = true;
    };

    $scope.editItem = function(item){
        if(item && item.selected){
            item.editing = true;
        }
    };

    $scope.doneEditing = function(item){
        item.editing = false;
    };

}]);

app.controller('BMapCtrl', ['$scope', function($scope){
    var mapHeight = Math.round(window.innerHeight*0.5)+'px';
    var mapWidth  = Math.round(window.innerHeight*0.5*1.5)+'px';
    $scope.mapStyle = {
        width:  mapWidth,
        height: mapHeight,
        margin: '0 auto'
    };
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.404, 39.915); //中心点和经纬度
    map.centerAndZoom(point, 15);//数字越小，显示范围越大
}]);