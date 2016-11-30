var auth = process.env.CLIENT_ID
var search = require('./app/api/search.js');
search("dogs", auth);
