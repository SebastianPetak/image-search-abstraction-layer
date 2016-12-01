var express = require('express');
var app = express();
var auth = process.env.CLIENT_ID
var routes = require('./app/routes/index.js');

routes(app, auth);

app.listen(process.env.PORT || 8001);
