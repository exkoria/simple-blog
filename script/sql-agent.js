var mySql = require('mysql');
var sys = require('util');

var DATABASE = 'simpleblog'; //Set in constructor, no need here?
var TABLE_USER = 'user';
var TABLE_BLOG_MESSAGE = 'blogmessage';
var TABLE_USER_BLOG_MESSAGE = 'userblogmessage';

var sql = require('mysql');
var sqlClient = sql.createClient({
	user : 'root',
	password : 'root'
});



exports.SqlAgent = function(databaseSettings){
	DATABASE = databaseSettings.name;
	sqlClient.query('USE ' + DATABASE);
	this.authenticate = authenticate;
	this.postMessage = postMessage;
	this.resetDatabase = resetDatabase; //Another comment
	this.saveNewUser = saveNewUser;
	this.getMessagesForUser = getMessagesForUser;
};

var saveNewUser = function(username, password, callback){
	sqlClient.query("CALL sp_create_user(?,?)", [username, password], function(err, results, fields) {
		if (err){
			var error = 'An sql error occurred';
			callback(error);
			return;
		}
		
		callback(null, results[0].id); //The id will be undefined if user exists since id will not be returned in select statement.
	});
};

var authenticate = function(username, password, callback) {

	sqlClient.query('SELECT id FROM ' + TABLE_USER + ' WHERE username = ? AND password = ?', [username, password], function(err, results, fields) {
		if(err) {
			throw err;
		} else if(results.length == 1) {
			callback(null, results[0].id);
		} else {
			callback(null, -1);
		}
	});
};

var getMessage = function(messageId, callback){
	sqlClient.query('SELECT message FROM ' + TABLE_BLOG_MESSAGE + ' WHERE id = ?', [messageId], function(err, results, fields) {
		if(err) {
			callback(err, '');
		} else if(results.length == 1) {
			callback(null, results[0].message);
		} else {
			callback(null, '');
		}
	});
};

var getMessagesForUser = function(userId, callback){
	sqlClient.query('SELECT blogmessage.message FROM blogmessage, userblogmessage ' +
						'WHERE blogmessage.id = userblogmessage.blogmessage_id AND userblogmessage.user_id = ?', [userId], function(err, results, fields) {
		var result = [];
		if(err) {
			callback(err, '');
		} else {
			
			for ( var i = 0; i < results.length; i++) {
				result[i] = results[i].message;
			}
			
			callback(null, result);
		}
	});
};

var postMessage = function(message, callback){
	sqlClient.query("CALL sp_store_blogmessage(?,?)", [message.textMessage, message.userId], function(err, results, fields) {
		if (err){
			var error = 'An sql error occurred';
			callback(error);
			return;
		}
		
		callback(null, results[0].blogMessageId); 
	});
};

var resetDatabase = function(callback){
	sqlClient.query('CALL sp_setup_new()', function(err, results, fields) {
		callback(err);
	});
};
