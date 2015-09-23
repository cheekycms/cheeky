var glob = require('glob'),
    path = require('path'),
    mongoose = require('mongoose');

exports.register = function (server, options, next) {
		
    // register data models
    glob('./models/**/*.model.js', { cwd: __dirname }, function (err, matches) {
        matches.forEach(require);

        // register routes
        glob('./routes/*.routes.js', { cwd: __dirname }, function (err, matches) {
            matches.forEach(function (filepath) {
                server.route(require(filepath));
            });
    
            // attempt reuse existing connection
            var db;
            if (mongoose.connection.readyState === mongoose.Connection.STATES.connected) {
                console.log('[mongodb] already connected');
                db = mongoose.connection;
            }

            // connect to mongodb
            db = mongoose.connect('mongodb://localhost/cheeky-cms').connection;
            db.on('error', console.error.bind(console, '[mongodb] [error] '));
            db.on('disconnected', function () {
                console.log('[mongodb] disconnected');
            });

            // open a connection
            db.once('open', function () {
                console.log('[mongodb] connected');
            });

            return next();
        });
    });

};
exports.register.attributes = {
    name: 'cheeky-api',
    version: '1.0.0'
};