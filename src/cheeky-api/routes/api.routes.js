var controller = require('../controllers/api.controller.js'),
	validations = require('../validations/api.validations.js');

module.exports = [
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
	}
];