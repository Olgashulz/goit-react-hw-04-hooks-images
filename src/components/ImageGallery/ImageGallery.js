import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onOpen }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} onToggle={onOpen} />
    </ul>
  );
};
export default ImageGallery;

ImageGallery.proTotypes = {
  onOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
