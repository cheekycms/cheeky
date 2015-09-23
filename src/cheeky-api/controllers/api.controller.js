var Boom = require('boom'),
	service = require('../services/content.service.js');

/**
 * Generate a content file for a given path
 */
function generateContent(request, reply) {
	service.generateContent('root', function(err, content){
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
	var parentPath = request.params.path;
	service.updateContent(request.payload, parentPath, function (err, content) {
		if (err) {
			return reply(Boom.badImplementation('Could not save the category.', err));
		}

		return reply(content);
	});
}

module.exports.updateContent = updateContent;
module.exports.generateContent = generateContent;