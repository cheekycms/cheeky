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
	Content.findOne({ key: 'root' }, function (err, content) {
		if (err) return next(err); // jshint ignore:line

		if (content) {
			// get all children of this category and project
			var include = { name: true, key: true, path: true };
			return Content.getChildren(true, include, next);
		}
		else{
			return next(null, null);
		}
	});
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
	Content.findOne({ path: parentPath }, function (err, content) {
		if (err) return next(err); // jshint ignore:line

		if (content) {
			return saveContent(data, parent, next);
		}
			
		// if we don't the find the parent content, 
		// we may need to create a root content element first
		if (!content && parentPath === 'root') {
			return saveContent({ name: 'root', key: 'root' }, null, function (err, parent) {
				return saveContent(data, parent, next);
			});
		}
		else {
			return next('Could not find parent content.');
		}
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
	content.parent = parent;
	content.save(function (err) {
		if (err) return next(err); // jshint ignore:line

		return next(null, content);
	});
}

module.exports.generateContent = generateContent;
module.exports.updateContent = updateContent;
