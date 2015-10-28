'use strict';

angular.module('app.default').directive('ckMenu', ckMenu);

function ckMenu(){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			items: '=items'
		},
		templateUrl: 'default/directives/menu/ckMenu.directive.html',
		link: function(scope, element, attrs){
			scope.$watch('items', function(){
				scope.root = {
					name: 'All Content',
					items: scope.items,
					isCategory: true
				};	
			});
		}
	};
}