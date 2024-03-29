var createError = require('http-errors');
var express = require('express');
var sql = require('mysql')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
var flash = require('express-flash')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var supervisorRouter = require('./routes/supervisor');
var accountsRouter = require('./routes/accounts');
var employeeRouter = require('./routes/employees')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session Settings
app.use(cookieParser());
app.use(cookieParser());
app.use(session({ 
    secret: 'N*HD%vm&#%FVB',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1400000 }
}))

app.use(flash());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/supervisor', supervisorRouter);
app.use('/accounts', accountsRouter);
app.use('/employee', employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
