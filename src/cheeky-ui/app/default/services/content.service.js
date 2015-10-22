'use strict';

angular.module('app.default').factory('contentService', contentService);

function contentService($q, $http, appSettings){
	return {
		update: update
	};
	
	function update(content){
		return $http.post(appSettings.services.content.update, content)
			.then(function(data){
				
			});
	}
}