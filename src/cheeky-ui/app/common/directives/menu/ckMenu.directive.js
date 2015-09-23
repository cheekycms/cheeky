'use strict';

angular.module('app.common').directive('ckMenu', ckMenu);

function ckMenu(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			items: '=items'
		},
		templateUrl: 'common/directives/menu/ckMenu.directive.html',
		link: function(scope, element, attrs){
			scope.root = {
				name: 'All Content',
				items: scope.items
			};
		}
	};
}