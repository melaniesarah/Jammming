import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.term !== this.state.term) {
            return true;
        } else {
            return false;
        }
    }

    search = () => {
        this.props.onSearch(this.state.term);
    }

    handleTermChange = e => {
        this.setState({ term: e.target.value });
    }

    handleKeyboardEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.search();
        }
    }


    render() {
        return (
          <div className="SearchBar">
            <input
              placeholder="Enter A Song, Album, or Artist"
              onChange={this.handleTermChange}
              onKeyUp={this.handleKeyboardEnter}
              value={this.state.term}
            />
            <button className="SearchButton" onClick={this.search}>
              SEARCH
            </button>
          </div>
        );
    }
};

export default SearchBar;


