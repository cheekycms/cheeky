angular.module('app', [])
	.constant('content', {
		msgs: {
			welcome: 'Welcome!'
		}
	})
	.directive('cmsContent', function(content){
		return {
			scope: {
				path: '@'	
			},
			link: function(scope, element, attrs){
				element.html('Hello!');
			}	
		};
	})
	.controller('default', function(){
		
	});