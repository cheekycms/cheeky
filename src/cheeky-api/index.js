exports.register = function(server, options, next){
		
	return next();
};
exports.register.attributes = {
	name: 'cheeky-api',
	version: '1.0.0'
};