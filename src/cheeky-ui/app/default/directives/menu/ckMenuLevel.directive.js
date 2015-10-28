'use strict';

angular.module('app.default').directive('ckMenuLevel', ckMenuLevel);

function ckMenuLevel(navigator, utils) {
	
	var predicate = utils.sort.firstBy(function (a, b) {
		return b.isCategory - a.isCategory;
	}).thenBy('name');

	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		scope: {
			item: '='
		},
		templateUrl: 'default/directives/menu/ckMenuLevel.directive.html',
		link: function (scope, element, attrs) {
			scope.history = scope.history || [];
			scope.back = back;
			scope.createCategory = createCategory;
			scope.createContent = createContent;
			scope.navigateFrom = navigateFrom;
			scope.navigateTo = navigateTo;

			// re-sort item's children when changed
			scope.$watch('item', sortChildren);
			
			/**
			 * Navigates back up the tree
			 */
			function back() {
				var k = scope.history.pop();
				scope.parent = k.parent;
				scope.item = k.item;
				
				navigateTo(scope.item);
			}
			
			/**
			 * Navigates to the category creation view
			 */
			function createCategory(){
				navigator.createCategory(scope.item.path);
			}
			
			/**
			 * Navigates to the content creation view
			 */
			function createContent(){
				navigator.createContent(scope.item.path);
			}
			
			/**
			 * Sorts the children of an item
			 */
			function sortChildren() {
				if (scope.item && scope.item.items) {
					scope.children = scope.item.items.sort(predicate);
				}
				else {
					scope.children = [];
				}
			}
			
			/**
			 * Navigates to a child tree
			 */
			function navigateFrom(fromElement, toElement) {
				scope.history.push({
					parent: scope.parent,
					item: scope.item
				});
				scope.parent = fromElement;
				scope.item = toElement;
				
				navigateTo(scope.item);
			}
	
			/**
			 * Navigates the content editor  
			 */
			function navigateTo(toElement) {
				if(toElement.isCategory){
					navigator.viewCategory(toElement.path);
				}
				else{
					navigator.viewContent(toElement.path);
				}
			}
		}

	};
}