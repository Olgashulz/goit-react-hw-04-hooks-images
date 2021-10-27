import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({
  onSubmitApp,
  removeImagesApp,
  resetStateApp,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputValueChange = event => {
    resetStateApp();

    setInputValue(event.currentTarget.value.toLowerCase());
  };

  const handleOnSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return toast.error('Please enter keyword.');
    }
    onSubmitApp(inputValue);
    removeImagesApp();
    // setInputValue('');
  };

  return (
    <header className="Searchbar">
      <a href="#" onClick={() => resetStateApp()} className="link">
        <h1 className="Title">Image Gallery</h1>
      </a>

      <form className="SearchForm" onSubmit={handleOnSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          value={inputValue}
          onChange={handleInputValueChange}
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

Searchbar.proTotypes = {
  onSubmit: PropTypes.func.isRequired,
  removeImages: PropTypes.func.isRequired,
  resetState: PropTypes.func,
};
