'use strict';

angular.module('app.default').factory('appSettings', function () {
	return {
		getMapUrl: function (path) {
			return 'map/' + path;
		},
		getContentUrl: function (path) {
			return 'content/' + path;
		},
		getUpdateUrl: function (path) {
			return 'content/' + path;
		}
	};
});