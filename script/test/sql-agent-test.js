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
					err.toString();
				}
				console.log('befeach');
				done();
			});
		  });

		it('should save a user if the username does not exist', function(done){
			
			sqlAgent.toString();
			console.log('it');
			done();
			
			
//		      var user = new User('Luna');
//		      user.save(function(err){
//		        if (err) throw err;
//		        done();
//		      });
		    });
	});
	
	describe('authenticate', function() {
		var sqlAgent = new SqlAgent({
			name : 'simpleblog_test'
		});
		
		beforeEach(function(done){ 
			sqlAgent.resetDatabase(function(err){
				if (err){
					err.toString();
				}
				console.log('befeach');
				done();
			});
		  });

		it('should save a user if the username does not exist', function(done){
			
			sqlAgent.toString();
			console.log('it');
			done();
			
			
//		      var user = new User('Luna');
//		      user.save(function(err){
//		        if (err) throw err;
//		        done();
//		      });
		    });
	});
});