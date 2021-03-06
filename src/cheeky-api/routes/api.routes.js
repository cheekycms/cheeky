var controller = require('../controllers/api.controller.js'),
	validations = require('../validations/api.validations.js');

module.exports = [
	{
		method: 'GET',
		path: '/content/{path*}',
		handler: controller.getContent,
		config: {
			description: 'Gets the content from the store'
		}
	},
	{
		method: 'POST',
		path: '/content/{path*}',
		handler: controller.updateContent,
		config: {
			description: 'Updates the specified content in a path.',
			validate: validations.updateContent
		}
	},
	{
		method: 'GET',
		path: '/content.json',
		handler: controller.generateContent,
		config: {
			description: 'Returns the content json document with all category and item names.'
		}
	},
	{
		method: 'GET',
		path: '/map/{path*}',
		handler: controller.generateMap,
		config: {
			description: 'Returns the content map json document with all category and item names.'
		}
	},
];