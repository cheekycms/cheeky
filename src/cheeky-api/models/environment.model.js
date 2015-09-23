var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
	name: String
});

mongoose.model('environment', model);