import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist" />
        <TrackList tracks={this.props.playlistTracks} 
          onRemove={this.props.onRemove} 
          isRemoval={true}
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;