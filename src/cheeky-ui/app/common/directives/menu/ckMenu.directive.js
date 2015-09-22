'use strict';

angular.module('app.common').directive('ckMenu', ckMenu);

function ckMenu(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			root: '=items'
		},
		templateUrl: 'common/directives/menu/ckMenu.directive.html'
	};
}