var express = require('express');
// const session = require('express-session');
var router = express.Router();
var request = require('request');

var redirect_uri = 'http://127.0.0.1:3000/spotify/callback';
// App client id
const client_id = '2e351bd6e1264b15a8feef4f9f944a3c';
// App client secret
const client_secret = '7775c7a39d1740ddaac0551832c5462e';
// Spotify access token
var access_token = null;

// login callback
router.get('/callback', function(req, res){
    // Get current href's params
    let code = req.query.code || null;
    if(code != null){
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

        request.post(authOptions, async function(error, response, body) {
            if (!error && response.statusCode === 200) {
                // Save token to session
                // LocalStorage.setItem('spotify_token', body.access_token);
                // req.session.spotify_token = body.access_token;
                access_token = body.access_token;

                res.cookie("spotify_token", access_token);
                 
                console.log('access_token', access_token);
                // console.log('spotify_token', req.session.spotify_token);
                //要改成重刷頁面
                res.redirect("/");
            }
        });
    }
});

module.exports = router;
