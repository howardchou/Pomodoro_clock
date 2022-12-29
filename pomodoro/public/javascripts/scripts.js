window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQD6mk-0_ftgITk7KQ70XvGH8tiAKemzZILlyzfzp2LY1x7Jri3lYZooyY8_S8-iCqldIAhJbzJYY1kHL_IXZHZJzhE9hWEGL7KjQN3BvF0Ytreygra9wXvaw2yXj5eOyYbAaVOmXDLoS3fVLVQt_79mpwiLr2FpqFyxoHRRmjhZ7JPRr92xELeQs9Fn--hGVQdabzfsXRTtyWcySnCqxPguU2c';
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
        });
    };

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

