'use strict';

angular.module('app.developer', ['app.default']).config(config);

/**
 * Configures the developer module routing
 */
function config($stateProvider) {
    $stateProvider
        .state('developer', {
        	url: '/dev',
            templateUrl: 'developer/views/developer.view.html'
        });
}