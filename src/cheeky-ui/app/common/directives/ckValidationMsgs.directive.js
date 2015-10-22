'use strict';

angular.module('app.default').directive('ckValidationMsgs', ckValidationMsgs);

function ckValidationMsgs($compile) {
	var html = [
		'<div ng-messages="$error" ng-if="$touched">',
		'	<div class="help-block input-error-msg" ng-repeat="(key,val) in messages" ng-message="{{key}}">{{val}}</div>',
		'</div>'
	].join('');
	
	return {
		restrict: 'A',
		require: '^form',
		terminal: true,
		link: function compile(scope, element, attrs, form) {
			var control = element.find('[name]'),
				name = control.attr('name');
			
			// remove directive to prevent infinite recursion during recompile
			var msgs = attrs.ckValidationMsgs;
			element.removeAttr('ck-validation-msgs');
			
			// add the error handling classes
			element.attr('ng-class', '{"has-error": $touched && $invalid}');
			
			// add the validation messages to the parent container
			if(control.parent('.input-group').length){
				control.parent('.input-group').after(html);
			}
			else {
				control.after(html);
			}
			
			// recompile the element with an inherited scope so it includes the new elements
			var $scope = scope.$new(false);
			$scope.messages = scope.$eval(msgs);
			$compile(element)($scope);
							
			// spy on the form validation properties
			['$dirty', '$error', '$invalid', '$touched', '$valid'].forEach(function (prop) {
				$scope[prop] = false;
				$scope.$parent.$watch([form.$name, name, prop].join('.'), function (value) {
					$scope[prop] = value;
				});
			});
		}
	};
}