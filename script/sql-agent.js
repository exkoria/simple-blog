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
	this.storeAccount = storeAccount;
	this.authenticate = authenticate;
	this.postMessage = postMessage;
	this.resetDatabase = resetDatabase; //Another comment
	this.saveNewUser = saveNewUser;
};

var storeAccount = function(accSettings, callback) {

	//First, check if the username exists, two usernames cannot be identical
	sqlClient.query('SELECT * FROM ' + TABLE_USER + ' ' + 'WHERE username = ?', [accSettings.userName], function selectCb(err, results, fields) {
		if(results.length == 1 && results[0].password == accSettings.password) {
			//The user is unique, check if the user want's to update new data
			accSettings.id = results[0].id;
			if(accSettings.newPassword && (accSettings.password !== accSettings.newPassword) && accSettings.newPassword) {
				sqlClient.query('UPDATE ' + TABLE_USER + ' ' + 'SET password = ? WHERE id = ?', [accSettings.newPassword, accSettings.id], function(err, results, fields) {
					if(err) {
						console.log(err);
					} else {
						callback(accSettings.id);
					}

				});
			} else { //do nothing
				callback(accSettings.id);
			}
		} else if(results.length == 1) {
			callback(0, 'Username already exists');
		} else { //new user, store account
			sqlClient.query('INSERT INTO ' + TABLE_USER + ' ' + 'SET username = ?, password = ?', [accSettings.userName, accSettings.password], function selectCb(err, results, fields) {
				if(err) {
					console.log(err);
				}
				sqlClient.end();
			});
		}
	});
};

var saveNewUser = function(username, password, callback){
	sqlClient.query("CALL sp_create_user(?,?)", [username, password], function(err, results, fields) {
		if (err){
			var error = 'An sql error occurred';
			callback(error);
			return;
		}
		
		callback(null, results[0]);
	});
};

var authenticate = function(username, password, callback) {

	sqlClient.query('SELECT id FROM ' + TABLE_CLIENT + ' WHERE username = ? AND password = ?', [username, password], function(err, results, fields) {
		if(err) {
			throw err;
		} else if(results.length == 1) {
			callback(results[0].id);
		} else {
			callback(0);
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

var postMessage = function(message, callback){
	sqlClient.query('SELECT id FROM ' + TABLE_CLIENT + ' WHERE username = ? AND password = ?', [username, password], function(err, results, fields) {
		if(err) {
			throw err;
		} else if(results.length == 1) {
			callback(results[0].id);
		} else {
			callback(0);
		}
	});
};

var resetDatabase = function(callback){
	sqlClient.query('CALL sp_setup_new()', function(err, results, fields) {
		callback(err);
	});
};
