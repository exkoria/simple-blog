var sqlAgent = require('./sql-agent');
//Create account
//Login (session based)
//Post message
//View messages
//View specific message

exports.ExpressRoutes = function(app){
	

	app.get('/', function(req, res) {
		res.send('hepp');
	});
	
	app.post('/createAccount', createAccount);
};

function createAccount(req, res){
	sqlAgent.storeAccount(req.body, function(userId){
		res.send({
			userId : userId
		});
	});
}

function postMessage(req, res){
	sqlAgent.storeMessage(req.body, function(messageId){
		res.send({
			messageId : messageId
		});
	});
}

function getMessage(req, res){
	sqlAgent.getMessage(req.body, function(err, message){
		
	});
}

function getMessages(callback){
	sqlAgent.getMessages(callback);
}