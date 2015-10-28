'use strict';

angular.module('app.default').controller('CategoryController', CategoryController);

function CategoryController(navigator, contentService){
	var vm = this;	

	// prop
	vm.category = {};	
	vm.path = navigator.getPath();
	
	// init
	(function(){
		contentService.get(vm.path).then(function(data){
			vm.category = data;
		}, function(){
			// TODO: handle error, rts?
		});
	})();
}