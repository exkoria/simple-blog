var express = require('express');

module.exports.startServer = function() {

	var app = express.createServer();

	// Configuration

	app.configure(function() {
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({
			secret : 'your secret here'
		}));
		app.use(app.router);
	});

	app.configure('development', function() {
		app.use(express.errorHandler({
			dumpExceptions : true,
			showStack : true
		}));
	});

	app.configure('production', function() {
		app.use(express.errorHandler());
	});

	// Init routes

	app.get('/', function(req, res) {
		res.send('hepp');
	});

	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
};
