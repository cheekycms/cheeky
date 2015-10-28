'use strict';

angular.module('app.default').controller('NavController', NavController);

function NavController($scope, $http, appSettings, utils) {
	var vm = this;

	$scope.$on('content-created', function(e, data){
		console.log('content-created', data);
		
		var parentPaths = data.path.split('-');
		parentPaths.pop();
		var parentPath = parentPaths.join('-');
		
		if(parentPath === ''){
			utils.insert(vm.items, data, 'name');
		}
		else {
			var parent = search(vm.items, parentPath);
			utils.insert(parent.items, data, 'name');
		}
	});
	
	function search(items, path){
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if(item.path === path){
				return item;
			}
			if(item.items){
				var result = search(item.items, path);
				if(result){
					return result;
				}
			}
		}
	}

	(function init(){
		
		var url = appSettings.getMapUrl('');
		$http.get(url).then(function(response){
			vm.items = response.data.items;
		});
		
	})();
	
}