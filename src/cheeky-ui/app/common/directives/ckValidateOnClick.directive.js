'use strict';

angular.module('app.default').directive('ckValidateOnClick', ckValidateOnClick);

function ckValidateOnClick($compile) {
	return {
		restrict: 'A',
		require: '^form',
		link: function compile(scope, element, attrs, form) {
			var col = element.parent('form').find('[name]'),
				parts = form.$name.split('.');

			element.on('click', function () {
				col.each(function (i, e) {
					var ele = angular.element(e),
						name = ele.attr('name');
						
					scope[parts[0]][parts[1]][name]['$touched'] = true;
				});
			});
		}
	};
}