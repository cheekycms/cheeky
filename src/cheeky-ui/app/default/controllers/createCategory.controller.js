'use strict';

angular.module('app.default').controller('CreateCategoryController', CreateCategoryController);

function CreateCategoryController($rootScope, $scope, navigator, contentService, utils){
	var vm = this;
	
	// props
	vm.parentPath = navigator.getPath();
	vm.customKey = false;
	vm.content = { name: '', key: '', isCategory: true };
	
	// methods
	vm.create = create;
	vm.rts = rts;
		
	// watches
	$scope.$watch(function(){
		return vm.customKey;
	}, generateKey);
	$scope.$watch(function(){
		return vm.content.name;
	}, generateKey);
	
	/**
	 * Persists the new content to the cms
	 */
	function create(){
		contentService.update(vm.parentPath, vm.content)
			.then(function(data){
				$rootScope.$broadcast('content-created', data);
				navigator.viewCategory(data.path);
			}, function(response){
				console.log('response', response);
			});
	}
	
	/**
	 * Generates the content key automagically
	 */
	function generateKey(){
		if(!vm.customKey){
			vm.content.key = contentService.generateKey(vm.content.name);
		}
	}
	
	/**
	 * Return the user to the previous view
	 */
	function rts(){
		navigator.returnToSender();
	}
}