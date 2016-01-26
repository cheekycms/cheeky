'use strict';

angular.module('app', ['app.default', 'app.developer']).config(config);

/**
 * Configures the angular application
 */
function config($locationProvider) {
	// Disable html 5 mode for theme support
	$locationProvider.html5Mode(true);
}