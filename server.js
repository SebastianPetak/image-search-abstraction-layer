var express = require('express');
var app = express();
var auth = process.env.CLIENT_ID
var routes = require('./app/routes/index.js');
var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imgSearch';

routes(app, auth, dbUrl);

app.listen(process.env.PORT || 8001);
