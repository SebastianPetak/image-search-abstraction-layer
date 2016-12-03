var MongoClient = require('mongodb').MongoClient

module.exports = function(dbUrl, callback) {
	MongoClient.connect(dbUrl, function(e, db) {
		if (e) throw e
		var imgSearchHist = db.collection('imgSearchHist');
		imgSearchHist.find({}).sort({
			// sorts by _id (which has a date)
			$natural: -1
		}).limit(10).toArray(function(e, response) {
			if (e) throw e;
			console.log(response);
			db.close()
			console.log("Database closed");
			callback(JSON.stringify(response));
		});
	});
}
