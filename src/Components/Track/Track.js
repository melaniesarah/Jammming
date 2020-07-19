import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    addTrack = () => {
        this.props.onAdd(this.props.track);
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={this.addTrack}>+</button>
            </div>
        );
    }
}

export default Track;
