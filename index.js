var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
require('dotenv/config');

// Config
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});

// Routers
var programas_router = require('./app_server/routes/programas');

// Routes
app.use('/programas', programas_router);

// Connect to DB
require('./app_server/models/db');

module.exports = app;
