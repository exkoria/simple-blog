var SqlAgent = require('./sql-agent').SqlAgent;

(function(){
	var sqlAgent = new SqlAgent({
		name : 'simpleblog_test'
	});
	sqlAgent.getMessagesForUser(7, function(err, res){
		res.toString();
	});
//	sqlAgent.saveNewUser('user1', 'pass1', function(err, results, fields){
//		if (err){
//			err.toString();
//		}
//		console.log('hepp');
//	});
	
//	sqlAgent.resetDatabase(function(err){
//		sqlAgent.saveNewUser('user1', 'pass1', function(err, results, fields){
//			if (err){
//				err.toString();
//			}
//			console.log('hepp');
//		});
//	});
	
	
})();