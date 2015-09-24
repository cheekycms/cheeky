var Joi = require('joi');

module.exports = {
	
	updateContent: {
		payload: {
			_id: Joi.string().trim().optional(),
			name: Joi.string().trim().min(3).max(100).required(),
			key: Joi.string().trim().min(3).max(15).required()
		},
		options: {
			allowUnknown: true
		}
	}
	
};