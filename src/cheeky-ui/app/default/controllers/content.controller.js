'use strict';

angular.module('app.default').controller('ContentController', ContentController);

function ContentController(navigator, contentService){
	var vm = this;	

	// prop
	vm.content = {};	
	vm.path = navigator.getPath();
	
	// init
	(function(){
		contentService.get(vm.path).then(function(data){
			vm.content = data;
		}, function(){
			// TODO: handle error, rts?
		});
	})();
}