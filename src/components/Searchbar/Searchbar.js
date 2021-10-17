import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputValueChange = event => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      return toast.error('Please enter keyword.');
    }

    this.props.onSubmit(this.state.inputValue);
    this.props.removeImages();
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <a href="#" onClick={() => this.props.resetState()} className="link">
          <h1 className="Title">Image Gallery</h1>
        </a>
        <form className="SearchForm" onSubmit={this.handleOnSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputValueChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.proTotypes = {
  onSubmit: PropTypes.func.isRequired,
  removeImages: PropTypes.func.isRequired,
  resetState: PropTypes.func,
};
