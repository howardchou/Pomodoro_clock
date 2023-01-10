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

let SpotifyWebApi = require('spotify-web-api-js');

const spotifyApi = new SpotifyWebApi();


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

var querystring = require('querystring');
var request = require('request');

///Spotify Login
// Random character generator
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateRandomString(length){
  const charactersLength = characters.length;
  let result = '';
  for(let i = 0; i< length; i++){
    result += characters[Math.floor(Math.random()*charactersLength)];
  }
  return result;
}
// App client id
const client_id = '2e351bd6e1264b15a8feef4f9f944a3c';
// App client secret
const client_secret = '7775c7a39d1740ddaac0551832c5462e';
// Spotify access token
var access_token = null;
// After auth or access denied, redirect to index page
var redirect_uri = 'http://127.0.0.1:3000/spotify/callback';

// Direct to login page and get code
app.get('/spotify/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email streaming';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// Request access token
app.get('/spotify/callback', function(req, res){
  // Exchange for access token
  let code = req.query.code || null;
  let state = req.query.state || null;

  if(state === null){
    res.redirect('/#' + 
    querystring.stringify(
      {error: 'state_mismatch'
    }));
  }
  else{
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + 
        client_secret).toString('base64')),
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // Get an access token
        access_token = body.access_token;
        console.log("--------------------------")
        console.log("token",access_token);
        console.log("--------------------------")
        // Save token in cookie
        res.cookie('spotify-access-token', access_token, {maxAge: 3600, httpOnly: true});
        
        // 拿到token先給spotifyApi
        spotifyApi.setAccessToken(body.access_token);

        res.redirect('/');
        // console.log(access_token);
        // console.log(body);
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });
      }
    });
  }
});

const play = (deviceID, token) => {
  const playaURL = `https://api.spotify.com/v1/me/player/play?device_id=${data.device_id}`;
  const d = { uris: ['spotify:track:5ya2gsaIhTkAuWYEMB0nw5'] };
  fetch(playaURL, {
    method: 'PUT',
    body: JSON.stringify(d),
    headers: new Headers({
        Authorization: `Bearer ${token}`,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error:', error))
    .then((response) => console.log('Success:', response));
}

if (access_token) {
    window.onSpotifyPlayerAPIReady = () => {
        const player = new Spotify.Player({
            name: 'Web Playback SDK Template',
            getOAuthToken: (cb) => {
                cb(access_token);
            },
        });

        // Error handling
        player.on('initialization_error', (e) => console.error(e));
        player.on('authentication_error', (e) => console.error(e));
        player.on('account_error', (e) => console.error(e));
        player.on('playback_error', (e) => console.error(e));

        // Playback status updates
        player.on('player_state_changed', (state) => {
            console.log(state);
        });

        // Ready
        player.on('ready', (data) => {
            if (data.device_id) {
                console.log('Ready with Device ID', data.device_id);
                play(data.device_id, _token)
            }
        });

        // Connect to the player!
        player.connect();
    };
}

// Refresh the access token
app.get('/spotify/refresh_token', function(req, res) {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + 
    (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.cookie('spotify-access-token', access_token, {maxAge: 3600, httpOnly: true});
      res.redirect('/');
    }
  });
});

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
