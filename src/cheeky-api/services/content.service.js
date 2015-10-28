var mongoose = require('mongoose'),
	Content = mongoose.model('content');

/**
 * Gets the content for a specified path
 * @param {string} path - The content path
 * @param {callback} next
 */
function getContent(path, next){
	return Content.findOne({ path: path }, function (err, content) {
		if (err) {
			return next(err);
		}
		
		return next(null, content);
	});
}

/**
 * Generates a combined content object for the given path 
 * @param {string} path - The content path
 * @param {callback} next
 */
function generateContent(path, map, next) {
	var propertyMap = { $$hashKey: false, __v: false };
	if(map){
		propertyMap.description = false;
		propertyMap.value = false;
	}
	Content.getCollection(path, propertyMap, next);
}

/**
 * Creates new cms content; will return error if a duplicate key is detected
 * @param {Object} data - The content to add or update
 * @param {string} data.name - The contents title or name
 * @param {string} data.key - The contents path key
 * @param {string} parentPath - The path of the contents parent
 * @param {callback} next
 */
function create(data, parentPath, next) {
	return Content.findOne({ path: parentPath }, function (err, parent) {
		if (err) {
			return next(err);
		}
		
		// look for duplicate keys
		var filter = { key: data.key };
		if (parent) {
			filter.path = { $regex: '^' + parentPath };
		}
		Content.findOne(filter, function (err, value) {
			if (err) {
				return next(err);
			}
			if (value) {
				return next('Duplicate key not allowed.');
			}
			return saveContent(data, parent, next);
		});
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
	if (parent) {
		content.parent = parent;
	}
	content.save(function (err) {
		if (err) {
			return next(err);
		}
		// ********************************************
		// make sure we have an items[] property if this is a category
		// ********************************************
		if(content.isCategory){
			content.items = [];
		}
		return next(null, content);
	});
}

/**
 * Updates existing content by using the _id
 * @param {Object} data - The content to add or update
 * @param {callback} next
 */
function update(data, next) {
	var id = data._id;
	return Content.findOneAndUpdate({ _id: id }, data, { new: true }, next);
}

/**
 * Update the cms content; creates new content if it does not exist
 * @param {Object} data - The content to add or update
 * @param {string} parentPath - The path of the contents parent
 * @param {callback} next
 */
function updateContent(data, parentPath, next) {
	if (data._id) {
		return update(data, next);
	}
	else {
		return create(data, parentPath, next);
	}
}

module.exports.getContent = getContent;
module.exports.generateContent = generateContent;
module.exports.updateContent = updateContent;
