import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'song1',
          artist: 'artist1',
          album: 'album1',
        },
        {
          id: 2,
          name: 'song2',
          artist: 'artist2',
          album: 'album2',
        },
        {
          id: 3,
          name: 'song3',
          artist: 'artist3',
          album: 'album3',
        },
        {
          id: 4,
          name: 'song4',
          artist: 'artist4',
          album: 'album4',
        },
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          id: 11,
          name: 'song11',
          artist: 'artist11',
          album: 'album11',
          uri: 'uri11',
        },
        {
          id: 12,
          name: 'song12',
          artist: 'artist12',
          album: 'album12',
          uri: 'uri12',
        },
        {
          id: 13,
          name: 'song13',
          artist: 'artist31',
          album: 'album13',
          uri: 'uri13',
        },
        {
          id: 14,
          name: 'song14',
          artist: 'artist14',
          album: 'album14',
          uri: 'uri14',
        },
      ],
    };
  }

  // componentDidMount() {
  //   const accessToken = Spotify.getAccessToken();
  //   this.setState({ accessToken });
  // }

  addTrack = track => {
    if (
      this.state.playlistTracks.find((savedTrack) => track.id === savedTrack.id)
    ) {
      return;
    }
    const playlistTracks = this.state.playlistTracks;
    playlistTracks.push(track);
    this.setState({ playlistTracks });
  };

  removeTrack = track => {
    const playlistTracks = this.state.playlistTracks.filter((savedTrack) => {
      return savedTrack.id !== track.id;
    });
    this.setState({ playlistTracks });
  };

  updatePlaylistName = name => {
    this.setState({ playlistName: name });
  }

  savePlaylist = () => {
    const { playlistTracks, playlistName } = this.state;
    
    const trackURIs =
      Array.isArray(playlistTracks) && playlistTracks.length ? 
      playlistTracks.map((track) => track.uri) : [];

    console.log('track URIs: ' + trackURIs);
    Spotify.savePlaylist(playlistName, trackURIs);
  }

  search = async term => {
    let searchResults = await Spotify.search(term);
    if (!searchResults) {
      searchResults = [];
    }
    this.setState({ searchResults });
    
  }

  render() {
    return (
      <div>
        <h1>
          <span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
