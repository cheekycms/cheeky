var mongoose = require('mongoose'),
    Boom = require('boom');

function apiController() {
	return {
		addCategory: addCategory,
		addSubcategory: addSubcategory,
		getContent: getContent
	};

	function addCategory(request, reply) {
		var CategoryModel = mongoose.model('category');
		var category = new CategoryModel(request.payload);
		category.save(function (err) {
			if (err) {
				return reply(Boom.badImplementation('Could not save the category.', err));
			}

			return reply(category);
		});
	}

	function addSubcategory(request, reply) {
		var CategoryModel = mongoose.model('category');
		CategoryModel.findOne({ path: request.params.path }, function (err, category) {
			if (err) {
				return reply(Boom.badRequest('Category "' + request.params.path + '" not found.', err));
			}

			var child = new CategoryModel(request.payload);
			child.parent = category;
			child.save(function (err) {
				if (err) {
					return reply(Boom.badImplementation('Could not save the category.', err));
				}

				return reply(child);
			});
		});
	}

	function getContent(request, reply) {
		var CategoryModel = mongoose.model('category');
		CategoryModel.findOne({}, function (err, category) {
			if(err){
				return reply(Boom.badImplementation('Could not retrieve the content.', err));
			}
			
			if(!category){
				return reply({
					version: 0.1,
					root: null,
					message: 'No content available.'
				}).type('application/json');
			}
			
			// get all children of this category and project
			category.getChildren(true, {name:true, key: true, path: true}, function (err, children) {

				return reply({
					version: 0.1,
					root: {
						name: category.name,
						key: category.key,
						path: category.path,
						items: children
					}
				}).type('application/json');

			});
		});
	}
}

module.exports = apiController();