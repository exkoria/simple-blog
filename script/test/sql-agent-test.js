var SqlAgent = require('../sql-agent').SqlAgent;
var assert = require('assert');
var should = require('should');
var vows = require('vows');

describe('sql-agent', function() {
	describe('storeAccount', function() {
		var sqlAgent = new SqlAgent({
			name : 'simpleblog_test'
		});

		beforeEach(function(done) {
			sqlAgent.resetDatabase(function(err) {
				if (err) {
					console.log(err);
					return;
				}
				done();
			});
		});

		it('should save a user if the username does not exist', function(done) {
			
			sqlAgent.saveNewUser('myUser', 'myPass', function(err, userId) {
				if (err) {
					throw err;
				}
				assert.equal(true, userId > 0);
				done();
			});
		});
		
		it('should return undefined if the username does exist', function(done) {
			sqlAgent.saveNewUser('user1', 'myPass', function(err, userId) {
				if (err) {
					throw err;
				}
				assert.isUndefined(userId);
				done();
			});
		});
	});
	
	describe('authenticate', function() {
		var sqlAgent = new SqlAgent({
			name : 'simpleblog_test'
		});

		beforeEach(function(done) {
			sqlAgent.resetDatabase(function(err) {
				if (err) {
					console.log(err);
					return;
				}
				done();
			});
		});

		it('should return user id if user is authenticated', function(done) {
			
			sqlAgent.authenticate('user1', 'pass1', function(err, userId) {
				if (err) {
					throw err;
				}
				assert.equal(true, userId > 0);
				done();
			});
		});
		
		it('should return -1 if the user is not authenticated', function(done) {
			sqlAgent.authenticate('user12', 'myPass', function(err, userId) {
				if (err) {
					throw err;
				}
				assert.equal(false, userId > 0);
				done();
			});
		});
	});
	
	describe('postMessage', function() {
		var sqlAgent = new SqlAgent({
			name : 'simpleblog_test'
		});

		beforeEach(function(done) {
			sqlAgent.resetDatabase(function(err) {
				if (err) {
					console.log(err);
					return;
				}
				done();
			});
		});

		it('should store a message and return the id if successful', function(done) {
			
			sqlAgent.postMessage({
				textMessage : 'this is the message',
				userId : 7
			}, function(err, blogMessageId) {
				if (err) {
					throw err;
				}
				assert.equal(true, blogMessageId > 0);
				done();
			});
		});
	});
});