'use strict';

angular.module('app.default').controller('CreateContentController', CreateContentController);

function CreateContentController($rootScope, $scope, contentService){
	var vm = this;
	
	// props
	vm.parentKey = '';
	vm.customKey = false;
	vm.content = {
		name: '',
		description: '',
		key: ''	
	};
	
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
		contentService.update(vm.content)
			.then(function(data){
				console.log('data', data);
				$rootScope.$broadcast('content-changed');
			}, function(response){
				console.log('response', response);
			});
	}
	
	/**
	 * Generates the content key automagically
	 */
	function generateKey(){
		if(!vm.customKey){
			var key = vm.content.name || '';
			if(vm.parentKey){
				key = [vm.parentKey, key].join('-');
			}
			vm.content.key = key.toLowerCase();
		}
	}
	
	/**
	 * Return the user to the previous view
	 */
	function rts(){
		// TODO: return to sender
	}
}