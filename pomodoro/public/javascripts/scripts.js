// Get playing status
function getCurrentState(player, which){
    player.getCurrentState().then(state => {
        if (!state) {
          console.error('User is not playing music through the Web Playback SDK');
          return;
        }
    
        var current_track = state.track_window.current_track;
        var next_track = state.track_window.next_tracks[0];
        var previous_track = state.track_window.previous_tracks[1];
        
        // Update playing song name
        document.getElementById('playing-name').innerText = current_track.name;
        // Update playing album img
        switch(which){
            // Previous
            case 0:
                document.getElementById('playing-name').innerText
                 = previous_track.name;
                document.getElementById('album').src
                 = previous_track.album.images[1].url;
                break;
            // Current
            case 1:
                document.getElementById('playing-name').innerText
                 = current_track.name;
                document.getElementById('album').src
                 = current_track.album.images[1].url;
                break;
            // Next
            case 2:
                document.getElementById('playing-name').innerText
                 = next_track.name;
                document.getElementById('album').src
                 = next_track.album.images[1].url;
                break;
        }
        
        // console.log(state.track_window);
        // console.log('Currently Playing', current_track);
        // console.log('Playing Next', next_track);
    });
}

window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQDp1gWxtqNVVUjuFf1GNARO7wNx8LaDhbxLONrTxZh4hsTJOmitdinh0CSryo9oCNR4u1MKR-kQf7pHkiQX7qNwaNweNbkLic8MEPixZcRv5GrT9fFKX8sYRJyMZVBSPTsIJ8V9ZCUaT-W7L7cuVPd-76BYYrjnGN0pzmZjeOP9Ry5GEEu7raTDP2hMGJWXCnvGvTGGGvgf1ZbXENGv19TUEGg';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => { 
        console.error(message);
    });
  
    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });
  
    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('autoplay_failed', () => {
        console.log('Autoplay is not allowed by the browser autoplay rules');
    });

    // Play toggle
    document.getElementById('togglePlay').onclick = function() {
        player.togglePlay().then(() => {
            console.log('Toggled playback!');
            document.getElementById('play').src = document.getElementById('play').src ==
             'http://127.0.0.1:3000/images/icons/icons8-play-button-circled.svg' ?
            '/images/icons/pause.svg' : '/images/icons/icons8-play-button-circled.svg';
        }).then(() => {
             // Update playing content info
            getCurrentState(player, 1);
        });
        // Update playing content info
        getCurrentState(player, 1);
       
    };
    
    // Play previous song
    document.getElementById('previous').onclick = function(){
        player.previousTrack().then(() => {
            console.log('Set to previous track!');
        }).then(() => {
            // Update playing content info
            getCurrentState(player, 0);
        });
        // Update playing content info
        getCurrentState(player, 0);
    }

    // Play next song
    document.getElementById('next').onclick = function(){
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        }).then(() => {
            // Update playing content info
            getCurrentState(player, 2);
        });
        // Update playing content info
        getCurrentState(player, 2);
    }
    player.connect();
}

