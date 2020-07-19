import { config } from './config';
import { isCompositeComponent } from 'react-dom/test-utils';

let accessToken = '';
const CLIENT_ID = config.CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
          return accessToken;
        } else if (window.location.href.match(/access_token=([^&]*)/)) {
            const expiresIn = parseInt(window.location.href
              .match(/expires_in=([^&]*)/)
              .toString()
              .split('=')[1]);
            accessToken = window.location.href
                .match(/access_token=([^&]*)/)
                .toString()
                .split('=')[1];
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            accessToken = window.location.href
              .match(/access_token=([^&]*)/)
              .toString()
              .split('=')[1];
            return accessToken;
        }
    },

    search: async function(term) {
        while (!accessToken)  {
            this.getAccessToken();
            setTimeout(() => null, 200);
        }

        const response = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=${term}`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
          
        if (response.ok) {
            const jsonResponse = await response.json();
            const tracks = jsonResponse.tracks.items.map((track) => {
              return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
              };
            })
            return tracks;
        } else {
            throw new Error('no response');
        }    
    }
};

export default Spotify;