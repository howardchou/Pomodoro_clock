// Require env, get env's data
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Using session
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var spotifyRouter = require('./routes/spotify');

// let SpotifyWebApi = require('spotify-web-api-js');

// const spotifyApi = new SpotifyWebApi();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/spotify', spotifyRouter);

// var querystring = require('querystring');
// var request = require('request');
// const { response } = require('express');

///Spotify Login
// Random character generator
// const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// function generateRandomString(length){
//   const charactersLength = characters.length;
//   let result = '';
//   for(let i = 0; i< length; i++){
//     result += characters[Math.floor(Math.random()*charactersLength)];
//   }
//   return result;
// }
// App client id
// const client_id = '2e351bd6e1264b15a8feef4f9f944a3c';
// // App client secret
// const client_secret = '7775c7a39d1740ddaac0551832c5462e';
// // Spotify access token
// var access_token = null;
// var refresh_token = null;
// // After auth or access denied, redirect to index page
// var redirect_uri = 'http://127.0.0.1:3000/spotify/callback';

// Direct to login page and get code
// app.get('/spotify/login', function(req, res) {
//   var state = generateRandomString(16);
//   var scope = 'user-read-private user-read-email streaming';

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

// Request access token
// app.get('/spotify/callback', function(req, res){
//   // Exchange for access token
//   let code = req.query.code || null;
//   let state = req.query.state || null;

//   if(state === null){
//     res.redirect('/#' + 
//     querystring.stringify(
//       {error: 'state_mismatch'
//     }));
//   }
//   else{
//     let authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + 
//         client_secret).toString('base64')),
//       },
//       json: true
//     };

//     request.post(authOptions, handleAuthorizationResponse(error, response, body));
    
    
//     res.redirect('/');
//   }
// });

// function handleAuthorizationResponse(error, response, body) {
//   if (!error && response.statusCode === 200) {
    
//     // Get an access token
//     if(body.access_token != null){
//       access_token = body.access_token,
//       // Save token in cookie
//       document.cookie('spotify-access-token', access_token,
//        {maxAge: 3600, httpOnly: true});
//     }
//     if(body.refresh_token != null){
//       refresh_token = body.refresh_token;
//       // Save token in cookie
//       document.cookie('spotify-refresh-token', refresh_token,
//        {maxAge: 3600, httpOnly: true});
//     }
    

    

//     var options = {
//       url: 'https://api.spotify.com/v1/me',
//       headers: {
//         'Authorization': 'Bearer ' + access_token
//       },
//       json: true
//     };
//   }
    
//     // console.log(access_token);
//     // console.log(body);
// }


// Refresh the access token
// app.get('/spotify/refresh_token', function(req, res) {

//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + 
//     (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       access_token = body.access_token;
//       res.cookie('spotify-access-token', access_token, {maxAge: 3600, httpOnly: true});
//       res.redirect('/');
//     }
//   });
// });

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


//Call API => Token
//Token => Cookie
//Headers =>Auth

//=> Token
//Token => html variable

//
