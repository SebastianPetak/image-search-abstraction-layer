var search = require('../api/search.js');
var history = require('../api/history.js');

module.exports = function(app, auth) {
	app.get('/', function(req, res) {
		res.end('index');
		console.log("Sent user to index");
	});

	app.get('/searchhistory', function(req, res) {
		history();
		res.end();
	});

	app.get('/:SEARCHTERMS', function(req, res) {
		var searchTerms = req.params.SEARCHTERMS;
		// offset used to paginate through responses
		var offset = req.query.offset || 10
		search(searchTerms, offset, function(response) {
			console.log(response);
		});
	});
};
