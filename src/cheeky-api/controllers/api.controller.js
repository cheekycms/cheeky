var Boom = require('boom'),
	service = require('../services/content.service.js');

/**
 * Generate a content file for a given path
 */
function generateContent(request, reply) {
	var path = _parsePath(request);
	service.generateContent(path, function(err, content){
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
	service.updateContent(request.payload, path, function (err, content) {
		if (err) {
			return reply(Boom.badImplementation('Could not save the content.', err));
		}

		return reply(content);
	});
}

/**
 * Parse the request and return the content path
 */
function _parsePath(request){
	return request.params.path ? request.params.path.split('/').join('-') : '';
}

module.exports.updateContent = updateContent;
module.exports.generateContent = generateContent;