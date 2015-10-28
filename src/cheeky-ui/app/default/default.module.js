'use strict';

angular.module('app.default', ['ngMessages', 'ui.router']).config(config);

/**
 * Configures the default module routing
 */
function config($urlRouterProvider, $stateProvider) {
	
	// Start at the default route
    $urlRouterProvider.otherwise('/view/category/');
	
    $stateProvider
        .state('create-category', {
			url: '/create/category/{path:.*}',
			templateUrl: 'default/views/create-category.view.html'
		})
		.state('create-content', {
			url: '/create/content/{path:.*}',
			templateUrl: 'default/views/create-content.view.html'
		})
		.state('category', {
			url: '/view/category/{path:.*}',
			templateUrl: 'default/views/category.view.html'
		})
		.state('content', {
			url: '/view/content/{path:.*}',
			templateUrl: 'default/views/content.view.html'
		});
}