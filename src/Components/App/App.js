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
          album: 'album1'
        },
        {
          id: 2,
          name: 'song2',
          artist: 'artist2',
          album: 'album2'
        },
        {
          id: 3,
          name: 'song3',
          artist: 'artist3',
          album: 'album3'
        },
        {
          id: 4,
          name: 'song4',
          artist: 'artist4',
          album: 'album4'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
