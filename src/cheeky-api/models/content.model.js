var mongoose = require('mongoose'),
	tree = require('./plugins/tree.plugin.js'),
	Schema = mongoose.Schema;

var model = new Schema({
	isCategory: Boolean,
	name: String,
	key: String,
	description: String,
	value: String
});
model.plugin(tree, {
	pathSeparator: '-',
	pathField: 'key'
});

mongoose.model('content', model);