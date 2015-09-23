var Joi = require('joi');

module.exports = {
	
	addCategory: {
		payload: {
			name: Joi.string().trim().min(3).max(100).required(),
			key: Joi.string().trim().min(3).max(15).required()
		}
	},
	addContent: {
		payload: {
			name: Joi.string().trim().min(3).max(100).required(),
			key: Joi.string().trim().min(3).max(15).required()
		}
	}
};