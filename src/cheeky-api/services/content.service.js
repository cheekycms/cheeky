var mongoose = require('mongoose'),
	Content = mongoose.model('content');

/**
 * Service continuation method, error first style.
 *
 * @callback callback
 * @param {string|Object} err
 * @param {Object} content
 */

/**
 * Generates a combined content object for the given path 
 * @param {string} path - The content path
 * @param {callback} next
 */
function generateContent(path, next) {
	var include = { $$hashKey: false, _v: false };
	return Content.getCollection(path, include, next);
}

/**
 * Update the cms content; creates new content if it does not exist
 * @param {Object} data - The content to add or update
 * @param {string} data.name - The contents title or name
 * @param {string} data.key - The contents path key
 * @param {string} parentPath - The path of the contents parent
 * @param {callback} next
 */
function updateContent(data, parentPath, next) {
	Content.findOne({ path: parentPath }, function (err, parent) {
		if (err) return next(err); // jshint ignore:line
		return saveContent(data, parent, next);
	});
}

/**
 * Persists the content to data store
 * @param {Object} data - The content to add or update
 * @param {string} data.name - The contents title or name
 * @param {string} data.key - The contents path key
 * @param {Object} parent - The contents parent
 * @param {callback} next
 */
function saveContent(data, parent, next) {
	var content = new Content(data);

	if(parent){
		content.parent = parent;
	}
	
	content.save(function (err) {
		if (err) return next(err); // jshint ignore:line

		return next(null, content);
	});
}

module.exports.generateContent = generateContent;
module.exports.updateContent = updateContent;
