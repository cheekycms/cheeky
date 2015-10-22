'use strict';

angular.module('app.default').constant('appSettings', {
	services: {
		content: {
			get: '/content/{path}',
			update: '/content/{path}'
		}
	}
});