'use strict';

angular.module('app.common').directive('mpLevel', mpLevel);

function mpLevel(recursion, $compile, $timeout) {
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		scope: {
			item: '=',
			level: '='
		},
		templateUrl: 'common/directives/menu/mpLevel.directive.html',
		link: function (scope, element, attrs) {
			scope.navigate = navigate;
			
			function navigate(parent, child) {
				if(!child.items){
					// TODO: navigate to content editor
					return;
				}
				parent.overlay = true;

				var xOffset = (scope.level + 1) * 40;
				var content = '<mp-level item="item" level="level"></mp-level>';
				var childMenu = angular.element(content);
				childMenu.css({
					'transform': 'translate('+xOffset+'px)'
				});
				
				var $scope = scope.$new(true);
				$scope.item = child;
				$scope.level = scope.level + 1;
				$scope.return = function(){
					parent.overlay = false;
					angular.element(childMenu).remove();
				};
				childMenu.on('$destroy', function(){
					$scope.$destroy();
				});
				$compile(childMenu)($scope);
				element.parents('.mp-menu').eq(0).append(childMenu);
			}
		}
	};
}