var Joi = require('joi');

module.exports = {
	
	updateContent: {
		payload: {
			isCategory: Joi.boolean().optional(),
			name: Joi.string().trim().min(3).max(100).required(),
			key: Joi.string().trim().min(3).max(15).required(),
			description: Joi.string().max(200).allow(''),
			value: Joi.string().allow('')
		},
		options: {
			allowUnknown: true
		}
	}
	
};