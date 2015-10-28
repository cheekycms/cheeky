'use script';

angular.module('app.developer').controller('DeveloperController', DeveloperController);

function DeveloperController($location){
	var vm = this;
	vm.url = $location.protocol() + '://' + $location.host() + ':' + $location.port();
}