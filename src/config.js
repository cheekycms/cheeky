module.exports = {
    debug: process.env.NODE_ENV === 'development',
    db: 'mongodb://cheeky-cms:3abreFas6bUgaStE@ds060478.mongolab.com:60478/cheeky-cms',
	port: process.env.port || 6551,
	staticContentPath: '../public'
};