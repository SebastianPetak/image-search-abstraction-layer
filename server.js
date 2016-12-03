var express = require('express');
var app = express();
var path = require('path');
var auth = process.env.CLIENT_ID;
var routes = require('./app/routes/index.js');
var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/imgSearch';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

routes(app, auth, dbUrl);

app.listen(process.env.PORT || 8001);
