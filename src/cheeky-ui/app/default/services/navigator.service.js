'use strict';

angular.module('app.default').factory('navigator', navigator);

function navigator($state){
	return {
		createCategory: createCategory,
		createContent: createContent,
		getPath: getPath,
		returnToSender: returnToSender,
		viewCategory: viewCategory,
		viewContent: viewContent
	};
	
	function createCategory(path){
		$state.go('create-category', {path: path});
	}
	
	function createContent(path){
		$state.go('create-content', {path: path});
	}
	
	function getPath(){
		return $state.params.path;
	}
	
	function returnToSender(){
		viewCategory(getPath());
	}
	
	function viewCategory(path){
		$state.go('category', {path: path});
	}
	
	function viewContent(path){
		$state.go('content', {path: path});
	}
}