// from: https://github.com/briankircho/mongoose-tree
var Schema = require('mongoose').Schema;

module.exports = exports = tree;

function tree(schema, options) {
	var pathSeparator = options && options.pathSeparator || '#';
	var pathField = options && options.pathField || '_id';

	schema.add({
		parent: {
			type: Schema.ObjectId,
			set: function (val) {
				if (typeof (val) === 'object' && val._id) {
					return val._id;
				}
				return val;
			},
			index: true
		},
		path: {
			type: String,
			index: true
		}
	});

	schema.pre('save', function (next) {
		var self = this;
		var isParentChange = this.isModified('parent');

		if (this.isNew || isParentChange) {
			if (!this.parent) {
				this.path = this[pathField].toString();
				return next();
			}
			
			this.collection.findOne({ pathField: this.parent[pathField] }, function (err, doc) {
				if (err) {
					return next(err);
				}
				
				var previousPath = self.path;
				self.path = doc.path + pathSeparator + self[pathField].toString();
				console.log(isParentChange);
				
				if (isParentChange && previousPath) {
					// When the parent is changed we must rewrite all children paths as well
					self.collection.find({ path: { '$regex': '^' + previousPath + pathSeparator } }, function (err, cursor) {
						if (err) {
							return next(err);
						}

						var stream = cursor.stream();
						stream.on('data', function (doc) {
							var newPath = self.path + doc.path.substr(previousPath.length);
							self.collection.update({ pathField: doc[pathField] }, { $set: { path: newPath } }, function (err) {
								if (err) {
									return next(err);
								}
							});
						});
						stream.on('close', function () {
							return next();
						});
						stream.on('error', function (err) {
							return next(err);
						});
					});
				} else {
					return next();
				}
			});
		} else {
			return next();
		}
	});

	schema.pre('remove', function (next) {
		if (!this.path) {
			return next();
		}
		this.collection.remove({ path: { '$regex': '^' + this.path + pathSeparator } }, next);
	});
	
	schema.static('getCollection', function (path, opt, cb) {
		if(typeof(opt) === 'function'){
			cb = opt;
			opt = {};
		}
		var filter = path ? { path: { $regex: '^' + this.path + pathSeparator } } : {};
		return this.find(filter, opt, cb);
	});

	schema.method('getChildren', function (recursive, opt, cb) {
		if (typeof (recursive) === 'function') {
			cb = recursive;
			recursive = false;
		}
		if(typeof(opt) === 'function'){
			cb = opt;
			opt = {};
		}
		var filter = recursive ? { path: { $regex: '^' + this.path + pathSeparator } } : { parent: this[pathField] };
		return this.model(this.constructor.modelName).find(filter, opt, cb);
	});

	schema.method('getParent', function (cb) {
		return this.model(this.constructor.modelName).findOne({ pathField: this.parent[pathField] }, cb);
	});

	var getAncestors = function (cb) {
		var ids;
		
		if (this.path) {
			ids = this.path.split(pathSeparator);
			ids.pop();
		} else {
			ids = [];
		}
		var filter = { pathField: { $in: ids } };
		return this.model(this.constructor.modelName).find(filter, cb);
	};

	schema.method('getAncestors', getAncestors);
	schema.static('getPathSeparator', function(){
		return pathSeparator;
	});

	schema.virtual('level').get(function () {
		return this.path ? this.path.split(pathSeparator).length : 0;
	});
}