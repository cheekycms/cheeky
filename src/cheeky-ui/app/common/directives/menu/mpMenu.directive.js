'use strict';

angular.module('app.common').directive('mpMenu', mpMenu);

function mpMenu(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			root: '=items'
		},
		templateUrl: 'common/directives/menu/mpMenu.directive.html',
		link: function(scope, element, attrs){
			
		}
	};
}