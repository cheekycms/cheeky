'use strict';

angular.module('app.common').controller('NavController', NavController);

function NavController($http) {
	var vm = this;

	(function init(){
		
		$http.get('content.json?lang=en_US').then(function(response){
			vm.items = response.data.root;
		});
		
	})();
	
}