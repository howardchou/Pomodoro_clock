window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCAk27lBd64HVIdUpsKXrQ12bf2-g_6bsQlQxSFtFGLk09Dm-4f19ME9U9KOwPqig6gsN_jFlXtKYjf2tM-tLauNEG0eUvQezyBBkzakC5N2rJllOn4vRSwlaIX_WKl0-zPkG_4ihuUg9WujQY9-5DaMYSM2u5mAkYg8593w0fMnNxqOyu9M2rom6Q5W0eTZ6yqJ0F8UsBKIRJ3qPoDpKCIWaQ';
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

    // Get playing status
    // player.getCurrentState().then(state => {
    //     if (!state) {
    //       console.error('User is not playing music through the Web Playback SDK');
    //       return;
    //     }
      
    //     var current_track = state.track_window.current_track;
    //     var next_track = state.track_window.next_tracks[0];
      
    //     console.log('Currently Playing', current_track);
    //     console.log('Playing Next', next_track);
    //   });

    // Play toggle
    document.getElementById('togglePlay').onclick = function() {
        player.togglePlay().then(() => {
            console.log('Toggled playback!');
            document.getElementById('play').src = document.getElementById('play').src == 'http://127.0.0.1:3000/images/icons/icons8-play-button-circled.svg' ?
            '/images/icons/pause.svg' : '/images/icons/icons8-play-button-circled.svg';
        });
    };
    
    // Play previous song
    document.getElementById('previous').onclick = function(){
        player.previousTrack().then(() => {
            console.log('Set to previous track!');
          });
    }

    // Play next song
    document.getElementById('next').onclick = function(){
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });
    }

    

    // document.getElementById('auth').onclick = function() {
    //     player.activateElement();
    //     console.log("auth");
    // };
    // myActivateElementButton.addEventListener('click', () => {
    //     // The player is activated. The player will keep the playing state once the state is transferred from other applications.
    //     player.activateElement();
    //   });
    player.connect();
}

