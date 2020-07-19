import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


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
        },
        {
          id: 12,
          name: 'song12',
          artist: 'artist12',
          album: 'album12',
        },
        {
          id: 13,
          name: 'song13',
          artist: 'artist31',
          album: 'album13',
        },
        {
          id: 14,
          name: 'song14',
          artist: 'artist14',
          album: 'album14',
        },
      ],
    };
  }

  addTrack = (track) => {
    if (this.state.playlistTracks.find(savedTrack => track.id === savedTrack.id)) {
      return;
    }
    const playlistTracks = this.state.playlistTracks;
    playlistTracks.push(track);
    this.setState({ playlistTracks });
  };

  removeTrack = (track) => {
    const playlistTracks = this.state.playlistTracks.filter(savedTrack => {
      return savedTrack.id !== track.id;
    });
    this.setState({ playlistTracks });
  };

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
