var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');
var jwt = require('jsonwebtoken');
var cors = require('cors')
var multer = require('multer');

// Express Start
var app = express();
app.use(cors());
app.set('Secret', config.secret);
app.use(express.static(__dirname + '/uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Header For Access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Token");
    next();
});
// Token MiddleWares
var checkTokken = function(req, res, next) {
  // check header for the token
  var token = req.headers['access-token'];
  // decode toke
  if (token) {
    jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
      if (err) {
        return res.json({ xyz: 'false' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.json({ 
        xyz: 'false' 
    });
  }
};
var verifyTokken = function(req, res) {
  var token = req.body.token;
  if (token) {
    jwt.verify(token, app.get('Secret'), (err, decoded) =>{      
      if (err) {
        return res.json({ message: 'invalid token' });    
      } else {
        return res.json({message: 'valid'});
      }
    });
  } else {
    // if there is no token  
    res.send({ 
        message: 'No token provided.' 
    });

  }
};
var checkTokkenFilter = function(req, res, next) {
  if(req._parsedUrl.pathname === '/tokenverify') {
      verifyTokken(req, res);
  } else if(req._parsedUrl.pathname === '/account/login' || req._parsedUrl.pathname === '/account/register') {
      next();
  } else {
      checkTokken(req, res, next);
  }
}
app.use(checkTokkenFilter);
app.use(session({secret: 'cropability1047'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/account',require('./routes/accounts'));
app.use('/settings',require('./routes/settings'));
app.use('/roles',require('./routes/roles'));
app.use('/fields',require('./routes/fields'));
app.use('/reservoir',require('./routes/reservoir'));
app.use('/material',require('./routes/materials'));
app.use('/area',require('./routes/areas'));
app.use('/zone',require('./routes/zones'));



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
