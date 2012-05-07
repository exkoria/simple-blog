var SqlAgent = require('../sql-agent').SqlAgent;
var assert = require('assert');
var should = require('should');
var vows = require('vows');

describe('sql-agent', function() {
	describe('storeAccount', function() {
		var sqlAgent = new SqlAgent({
			name : 'simpleblog_test'
		});
		
		beforeEach(function(done){ 
			sqlAgent.resetDatabase(function(err){
				if (err){
					console.log(err);
					return;
				}
				done();
			});
		  });

		it('should save a user if the username does not exist', function(done){
			sqlAgent.saveNewUser('myUser', 'myPass', function(err, userId){
				if (err){
					throw err;
				}
				assert.equal(true, userId > 0);
				done();
			});
			
//		      var user = new User('Luna');
//		      user.save(function(err){
//		        if (err) throw err;
//		        done();
//		      });
		    });
	});
});