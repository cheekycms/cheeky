exports.register = function(server, options, next){
		
	// register route for public assets
	server.route({
		method: 'GET',
		path: '/public/{path*}',
		handler: {
			directory: {
				path: './',
				index: false
			}
		}
	});

	// register route to serve index file
	server.route({
		method: 'GET',
		path: '/{path*}',
		handler: function (request, reply) {
			return reply.view('views/index');
		}
	});
	
	return next();
};
exports.register.attributes = {
	name: 'cheeky-ui',
	version: '1.0.0'
};