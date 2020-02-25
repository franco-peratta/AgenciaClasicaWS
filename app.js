require('dotenv/config');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var session = require('express-session');
var passport = require('passport');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // VER VER VER si es true o false
app.use(cookieParser());

// Connect to DB
const conection = require('./config/db');

// Intento passport session cookies
const MongoStore = require('connect-mongo')(session);

const session_store = new MongoStore({
  mongooseConnection: conection,
  collection: 'sessions'
});
// https://www.youtube.com/watch?v=J1qXK66k1y4&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=3
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: session_store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  }
})); // Puedo obtener la sesion usando req.session

// Fin del intento xD

// Passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Routers
var programas_router = require('./routes/programas');
var mensajes_router = require('./routes/mensajes');
var auth_router = require('./routes/auth');

// Routes
app.use('/programas', programas_router);
app.use('/mensajes', mensajes_router);
app.use('/auth', auth_router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
