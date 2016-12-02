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
				db.close();
				if (e) throw e
				console.log("Added search to database: " + result.ops[0].search_terms);
				console.log("Database closed");
			})
		});
	};

	var options = { uri:'https://api.imgur.com/3/gallery/search?q={' + searchTerms + '}',
									method: 'GET',
									type: 'GET',
									top: offset,
									headers: {
										"Authorization": "Client-ID " + auth,
										Accept: 'application/json'
									}
								};

	request(options, function(e, res, body) {
		if (e) throw e
		callback(prepSearchRes(body));
	})

	var prepSearchRes = function(body) {
		var parsedJSON = JSON.parse(body);
		var data = parsedJSON.data;
		var result = [];
		if (data.length > 0) {
			for (var i = offset; i < offset + 10 && i < data.length; i++) {
				var obj = {
					"cover": "i.imgur.com/" + data[i].cover + ".jpg",
					"title": data[i].title,
					"link": data[i].link
				}
				result.push(obj);
			}
		} else {
			return JSON.stringify({"error": "No match found"});
		}
		return JSON.stringify(result);
	};

	saveSearchTerms();

};	
