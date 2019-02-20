var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');

//var mongoCloudConStr = 'mongodb://test:test@customermanager-shard-00-00-okf9d.mongodb.net:27017,customermanager-shard-00-01-okf9d.mongodb.net:27017,customermanager-shard-00-02-okf9d.mongodb.net:27017/test?ssl=true&replicaSet=customermanager-shard-0&authSource=admin&retryWrites=true';
//var mongoCloudConStr = 'mongodb://customermanager-shard-00-00-okf9d.mongodb.net:27017,customermanager-shard-00-01-okf9d.mongodb.net:27017,customermanager-shard-00-02-okf9d.mongodb.net:27017/test?replicaSet=customermanager-shard-0" --ssl --authenticationDatabase admin --username test --password test'
//var mongoCloudConStr = 'mongodb://customermanager-shard-00-00-okf9d.mongodb.net:27017,customermanager-shard-00-01-okf9d.mongodb.net:27017,customermanager-shard-00-02-okf9d.mongodb.net:27017/test?replicaSet=customermanager-shard-0" --ssl --authenticationDatabase admin --username test --password test'
//var mongoCloudConStr = "mongodb://<test>:<test123>@ds042128.mlab.com:42128/meanangular6"
var mongoCloudConStr = "mongodb://test:test123@ds227199.mlab.com:27199/meanangular6"

//var localConStr = 'mongodb://localhost/mean-angular6'
console.log(mongoCloudConStr);
mongoose.connect(mongoCloudConStr)
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/books', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-create', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/book-edit/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api', apiRouter);

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
  res.send(err.status);
});

module.exports = app;
