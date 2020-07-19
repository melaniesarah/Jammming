import { config } from './config';
import { isCompositeComponent } from 'react-dom/test-utils';

let accessToken = '';
const CLIENT_ID = config.CLIENT_ID;
const REDIRECT_URI = 'MySpotifyLite.surge.sh';

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
            setTimeout(() => null, 250);
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
    },

    savePlaylist: async function(playlistName, trackURIs) {
        let playlistId = '';
        let userId = '';

        if (!playlistName || !trackURIs) return;

        while (!accessToken) {
          this.getAccessToken();
          setTimeout(() => null, 250);
        }

        const getHeaders = method => {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${accessToken}`) 
            if (method === 'POST') {
                headers.append('Content-Type', 'application/json') 
            };
            return headers;
        }
            
        const getUrl = (endpointType, id = '') => {
            let url;
            switch (endpointType) {
                case 'user':
                    url = 'https://api.spotify.com/v1/me';
                    break;
                case 'playlists':
                    url =  `https://api.spotify.com/v1/users/${id}/playlists`;
                    break;
                    case 'tracks':
                        url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
                        break;
                default:
                    url = 'https://api.spotify.com/v1/';
                    break;
            }
            return url;
        };


        const getUserId = async () => {
            const url = getUrl('user');
            const myHeaders = getHeaders('GET');
            
            const response = await fetch(url, {
                method: 'GET',
                headers: myHeaders
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            } else {
                return response.error;
            }
        };

        const addNewPlaylist = async (userId) => {
            const url = getUrl('playlists', userId);
            const myHeaders = getHeaders('POST');
            const accessHeaders = getHeaders('GET');
            const data = { 
                name: playlistName, 
                public: true 
            };

            const preResponse = await fetch(url, {
              method: 'OPTIONS',
              'Access-Control-Request-Method': 'POST',
              'Access-Control-Request-Headers': myHeaders,
              headers: accessHeaders,
              body: JSON.stringify(data),
              Origin: 'https://api.spotify.com',
              Host: REDIRECT_URI
            });

            const response = await fetch(url, {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(data),
              Origin: 'https://api.spotify.com',
              Host: REDIRECT_URI
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            } else {
                return response.error;
            }
        }

        const addTracksToPlaylist = async (listId) => {
            const url = getUrl('tracks', listId);
            const myHeaders = getHeaders('POST');
            const data = {
              uris: trackURIs,
              public: true,
            };
            const response = await fetch(url, {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(data),
              Origin: 'https://api.spotify.com',
              Host: REDIRECT_URI,
            });

            if (response.ok) {
              const jsonResponse = await response.json();
              return jsonResponse.id;
            } else {
              return response.error;
            }
        }
     
         userId = await getUserId();
         const playlistID = await addNewPlaylist(userId);
         const addTracks = await addTracksToPlaylist(playlistID);
    }
};

export default Spotify;