var request = require('request');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

module.exports = function(searchTerms, offset, auth, dbUrl, callback) {

	function saveSearchTerms() {
		MongoClient.connect(dbUrl, function(e, db) {
			if (e) throw e
			console.log("Connected to database");
			var imgSearchHist = db.collection('imgSearchHist');
			imgSearchHist.insert({
				'search_terms': searchTerms
			}, function(e, result) {
				if (e) throw e
				console.log("Added search to database: " + result.ops[0].search_terms);
			})
			db.close();
		});
	};

/*
	var options = { uri:'https://api.imgur.com/3/gallery/search?q={' + searchTerms + '}',
									method: 'GET',
									type: 'GET',
									headers: {
										"Authorization": "Client-ID " + auth,
										Accept: 'application/json'
									}
								};

	request(options, function(e, res, body) {
		if (e) throw e
		console.log(body);
	})
*/

	saveSearchTerms();

};	
