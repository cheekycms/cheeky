'use strict';

angular.module('app.common').directive('ckMenuLevel', ckMenuLevel);

function ckMenuLevel() {
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		scope: {
			item: '='
		},
		templateUrl: 'common/directives/menu/ckMenuLevel.directive.html',
		link: function (scope, element, attrs) {
			scope.history = scope.history || [];
			scope.back = back;
			scope.navigate = navigate;
			
			function back(){
				var k = scope.history.pop();
				scope.parent = k.parent;
				scope.item = k.item;
			}
			
			function navigate(fromElement, toElement) {
				if(!toElement.items){
					// TODO: navigate to content editor
					return;
				}

				scope.history.push({
					parent: scope.parent,
					item: scope.item
				});
				scope.parent = fromElement;
				scope.item = toElement;
			}
		}
	};
}