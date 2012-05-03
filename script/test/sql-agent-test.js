var SqlAgent = require('../sql-agent').SqlAgent;
var assert = require('assert');
var should = require('should');
var vows = require('vows');

describe('sql-agent', function() {
	describe('storeAccount', function() {
		var sqlAgent = new SqlAgent({
			name : 'simpleblog-test'
		});
		
		beforeEach(function(done){ //TODO: reset database
		    db.clear(function(err){
		      if (err) return done(err);
		      db.save([tobi, loki, jane], done);
		    });
		  });

		it('should save a user if the username does not exist', function(done){
			
			sqlAgent.resetDatabase(function(err){
				
			});
			
		      var user = new User('Luna');
		      user.save(function(err){
		        if (err) throw err;
		        done();
		      });
		    });
	});
});