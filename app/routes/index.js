var search = require('../api/search.js');
var history = require('../api/history.js');

module.exports = function(app, auth, dbUrl) {
	app.get('/', function(req, res) {
		res.render('index');
		console.log("Sent user to index");
	});
	
	// returns 10 most recent searches
	app.get('/searchhistory', function(req, res) {
		history(dbUrl, function(response) {
			res.type("json");
			res.send(response);
		});
	});

	// returns 10 matching items from imgur api based on url  parameter
	app.get('/:SEARCHTERMS', function(req, res) {
		var searchTerms = req.params.SEARCHTERMS;
		// offset used to paginate through responses
		var offset = req.query.offset || 0
		if (searchTerms != 'favicon.ico') {
			search(searchTerms, offset, auth, dbUrl, function(response) {
				console.log("Search response sent");
				res.type("json");
				res.send(response);
			});
		}
	});
};
