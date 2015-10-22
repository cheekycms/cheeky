'use strict';

angular.module('app.default', ['app.common']).config(config);

/**
 * Configures the default module routing
 */
function config($stateProvider) {
    $stateProvider
        .state('default', {
        	url: '/',
            templateUrl: 'default/views/default.view.html'
        })
		.state('create', {
			url: '/create',
			templateUrl: 'default/views/create.view.html'
		});
}