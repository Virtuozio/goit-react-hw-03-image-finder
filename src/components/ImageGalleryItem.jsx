import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags }) => (
  <img
    className="ImageGalleryItem-image"
    src={webformatURL}
    alt={tags}
    loading="lazy"
  />
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
