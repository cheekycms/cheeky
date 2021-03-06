var Hapi = require('hapi'),
	Path = require('path'),
    config = require('./config.js');

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
	port: config.port,
	routes: {
		files: {
			relativeTo: Path.join(__dirname, config.staticContentPath)
		}
	}
});

// register plugins
server.register([good, inert, api, ui], function (err) {
	if (err) {
		throw err;
	}
	
	server.start(function () {
		console.log('[hapi]', server.info.uri);
	});
});
