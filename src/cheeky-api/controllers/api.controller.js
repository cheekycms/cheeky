var Boom = require('boom'),
	service = require('../services/content.service.js');

/**
 * Get the content
 */
function getContent(request, reply){
	var path = _parsePath(request);
	service.getContent(path, function(err, content){
		if (err) {
			console.log(err);
			return reply(Boom.badImplementation('Could not save the content.', err));
		}
		
		return reply(content);
	});
}

/**
 * Generate a content file for a given path
 */
function generateContent(request, reply) {
	return createContentFile(false, request, reply);
}

/**
 * Generate a content file for a given path
 */
function generateMap(request, reply) {
	return createContentFile(true, request, reply);
}

/**
 * Generate a content file for a given path
 */
function createContentFile(map, request, reply) {
	var path = _parsePath(request);
	service.generateContent(path, map, function(err, content){
		var response = {
			version: 0.1
		};
		
		if(content){
			response.items = content;
		}
		else{
			response.items = null;
			response.message = 'No content available.';
		}
		
		return reply(response).type('application/json');
	});
}


/**
 * Update cms content
 */
function updateContent(request, reply) {
	var path = _parsePath(request);
	console.log(path);
	service.updateContent(request.payload, path, function (err, content) {
		if (err) {
			console.log(err);
			return reply(Boom.badImplementation('Could not save the content.', err));
		}

		return reply(content);
	});
}

/**
 * Parse the request and return the content path
 */
function _parsePath(request){
	return request.params.path || '';
}

module.exports.updateContent = updateContent;
module.exports.generateContent = generateContent;
module.exports.generateMap = generateMap;
module.exports.getContent = getContent;