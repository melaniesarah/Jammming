import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };

  removeTrack = () => {
    this.props.onRemove(this.props.track);
  };

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button className="Track-action">
          {!this.props.isRemoval && <a onClick={this.addTrack}>+</a>}
          {this.props.isRemoval && <a onClick={this.removeTrack}>-</a>}
        </button>
      </div>
    );
  }
}

export default Track;
