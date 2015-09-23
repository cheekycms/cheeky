var controller = require('../controllers/api.controller.js'),
	validations = require('../validations/api.validations.js');

module.exports = [
	{
		method: 'POST',
		path: '/category/add',
		handler: controller.addCategory,
		config: {
			description: 'Adds a new category.',
			validate: validations.addCategory
		}
	},
	{
		method: 'POST',
		path: '/category/{path}/add',
		handler: controller.addSubcategory,
		config: {
			description: 'Adds a child category to the specified category.',
			validate: validations.addCategory
		}
	},
	{
		method: 'GET',
		path: '/content.json',
		handler: controller.getContent,
		config: {
			description: 'Returns the content json document with all category and item names.'
		}
	}
];