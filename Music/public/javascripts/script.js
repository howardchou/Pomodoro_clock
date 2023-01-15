const scopes = `streaming user-read-playback-position user-modify-playback-state user-read-playback-state user-read-private user-read-email`;
const redirectUri = `${API_HOST}/podcast/just_req=1`;
const authEndpoint = 'https://accounts.spotify.com/authorize';

const authURL = `${authEndpoint}?client_id=${encodeURIComponent(CFG_SPOTIFY_CLIENT_ID)}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&state=123`;

window.location.href = authURL;

interface I_RedirectParams {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    state?: string;
}

function getRedirectParams():I_RedirectParams {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

const params = getRedirectParams();
if (params?.access_token) {
    
}