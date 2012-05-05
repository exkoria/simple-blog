var sqlAgent = require('./sql-agent');
//Create account
//Login (session based)
//Post message
//View messages
//View specific message

//Comment fdfdsf

function createAccount(userSettings, callback){
	sqlAgent.storeAccount(userSettings, callback);
}

function postMessage(message, callback){
	sqlAgent.storeMessage(message, callback);
}

function getMessage(messageId, callback){
	sqlAgent.getMessage(messageId, callback);
}

function getMessages(callback){
	sqlAgent.getMessages(callback);
}