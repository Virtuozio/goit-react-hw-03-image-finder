export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => (
  <img
    className="ImageGalleryItem-image"
    src={webformatURL}
    alt={tags}
    loading="lazy"
  />
);
