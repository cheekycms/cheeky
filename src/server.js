var Hapi = require('hapi'),
	Path = require('path');

var internals = {
    debug: process.env.NODE_ENV === 'development',
    db: 'mongodb://localhost/cap-dev',
	port: 6551,
	staticContentPath: '../public'
};

// logging
var good = {
	register: require('good'),
	options: {
		reporters: [
			{
				reporter: require('good-console'),
				events: { error: '*', log: '*', response: '*', request: '*' }
			}
		]
	}
};

// static content handler
var inert = {
	register: require('inert')
};

// template rendering
var vision = {
	register: require('vision')
};
var visionary = {
	register: require('visionary'),
	options: {
		engines: {
			html: 'handlebars'
		},
		layout: 'default',
		path: Path.join(__dirname, internals.staticContentPath),
		partialsPath: Path.join(__dirname, internals.staticContentPath, 'views/partials'),
		layoutPath: Path.join(__dirname, internals.staticContentPath, 'views/layouts'),
		isCached: !internals.debug
	}
};

// our modules, api & content
var api = {
	register: require('./cheeky-api')
};
var ui = {
	register: require('./cheeky-ui')
};

// Build a hapi server
var server = new Hapi.Server();
server.connection({
	port: internals.port,
	routes: {
		files: {
			relativeTo: Path.join(__dirname, internals.staticContentPath)
		}
	}
});

// register plugins
server.register([good, inert, vision, visionary, api, ui], function (err) {
	if (err) {
		throw err;
	}
	
	server.start(function () {
		console.log('[hapi]', server.info.uri);
	});
});
