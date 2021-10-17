import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ onLoadMore }) {
  return (
    <button type="button" className="Button" onClick={onLoadMore}>
      Load more
    </button>
  );
}

Button.proTotypes = {
  onLoadMore: PropTypes.func.isRequired,
};
