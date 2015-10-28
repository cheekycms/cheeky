'use strict';

angular.module('app.default').factory('contentService', contentService);

function contentService($q, $http, appSettings) {
	return {
		generateKey: generateKey,
		get: get,
		update: update
	};
			
	/**
	 * Generates the content key automagically
	 * @param contentName The name given to the content
	 */
	function generateKey(contentName){
		var key = contentName || '';
		key = key.replace(/\W/g, '');
		return key.toLowerCase();
	}

	/**
	 * Get the content by it's path
	 * @param path The content's path
	 */
	function get(path){
		var deferred = $q.defer();

		var uri = appSettings.getContentUrl(path);
		$http.get(uri)
			.then(function (response) {
				deferred.resolve(response.data);
			}, function (response) {
				deferred.reject(response);
			});

		return deferred.promise;
	}

	/**
	 * Updates or creates the content for the given parent path
	 * @param parentPath The parent path
	 * @param content The content to update or create
	 */
	function update(parentPath, content) {
		var deferred = $q.defer();

		var uri = appSettings.getUpdateUrl(parentPath);
		$http.post(uri, content)
			.then(function (response) {
				deferred.resolve(response.data);
			}, function (response) {
				deferred.reject(response);
			});

		return deferred.promise;
	}
}