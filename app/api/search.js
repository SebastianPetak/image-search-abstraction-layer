var request = require('request');

module.exports = function(searchParams, auth) {
	var options = { uri:'https://api.imgur.com/3/gallery/search?q={' + searchParams + '}',
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
};	
