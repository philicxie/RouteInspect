var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index     =   require('./routes/index'          );
var facility  =   require('./routes/facilityRemote' );
var authority =   require('./routes/authorityRemote');
var signin    =   require('./routes/signinRemote'   );
var mission   =   require('./routes/missionRemote'  );

var app = express();

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
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

app.use('/',          index     );
app.use('/facility',  facility  );
app.use('/authority', authority );
app.use('/signin',    signin    );
app.user('/mission',  mission   );

//main----------------------------

// var temUser = new User({account: 'dyd@sjtu.edu.cn', name: 'Juicy', password:'duanduan', auth: 110});
// temUser.save(function(err, doc){
//     if(err) return console.error(err);
//     console.log(doc);
// });
// User.find(function(err, doc){
//     if(err) return console.error(err);
//     console.log(doc);
// });
// var temFacility = new Facility({
//     name: '无负压供水泵',
//     uid: 'FAB001',
//     area: 'AR01',
//     address: '街上',
//     position: [0, 0],
//     status: 0,
//     category: 'FAB'
// });
//
// temFacility.save(function(err, doc){
//     if(err) return console.error(err);
//     console.log(doc);
// });

// Facility.distinct('name', function(err, doc){
//     if(err) return console.error(err);
//     console.log(doc);
// })

//!main---------------------------

// Test database connection
var User = require('./routes/db').user;
User.find({name:'admin'}, function(err, doc) {
  if(err) {
    return console.error(err);
  }
  console.log('MongoDB Connect Success');
});


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
