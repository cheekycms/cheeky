var mongoose = require('mongoose'),
	tree = require('./plugins/tree.plugin.js'),
	Schema = mongoose.Schema;

var model = new Schema({
	name: String,
	key: String,
	isCategory: Boolean
});
model.plugin(tree, {
	pathSeparator: '-',
	pathField: 'key'
});

mongoose.model('content', model);