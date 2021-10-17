import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ onToggle, images }) => {
  return (
    <>
      {images.map(item => {
        return (
          <li
            onClick={() => onToggle(item.largeImageURL)}
            className="ImageGalleryItem"
            key={item.id}
          >
            <img
              src={item.webformatURL}
              alt={item.tags[0]}
              className="ImageGalleryItem-image"
              data-largeimage={item.largeImageURL}
            />
          </li>
        );
      })}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.proTotypes = {
  onToggle: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
