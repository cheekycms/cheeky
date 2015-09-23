var Joi = require('joi');

module.exports = {
	
	updateContent: {
		payload: {
			name: Joi.string().trim().min(3).max(100).required(),
			key: Joi.string().trim().min(3).max(15).required(),
			isCategory: Joi.boolean().required()
		}
	}
	
};