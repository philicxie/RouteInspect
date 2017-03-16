var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');
var mongodb = require('mongodb').MongoClient;

var User = require('./routes/db').user;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//main----------------------------
//var db = mongoose.connect('mongodb://localhost/RouteInspect');
// var address = 'mongodb://localhost:27017/RouteInspect';
// mongodb.connect(address, function(err, db) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('mongodb connection success');
//         var collection = db.collection('Users');
//         var whereStr = {name: 'xlw'};
//         collection.find(whereStr).toArray(function(err, result){
//             if(err) {
//                 console.log(err);
//                 return;
//             }
//             console.log(result);
//             db.close();
//
//         });
//     }
// });

// var temUser = new User({name: 'Phil', password:'432432'});
// temUser.save(function(err, doc){
//     if(err) return console.error(err);
//     console.log(doc);
// });
User.find(function(err, doc){
    if(err) return console.error(err);
    console.log(doc);
});
//!main---------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
