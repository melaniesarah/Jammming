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
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
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

    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    });
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
